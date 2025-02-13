import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { OpenAI } from 'openai'

import { chunkText } from "@/lib/chunkText";
import { load } from "cheerio";

const bcrypt = require('bcrypt');

export async function POST(req, res) {
  const DB_NAME = process.env.DB_NAME
  const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK;
  const LAMBDA_ENDPOINT = process.env.LAMBDA_ENDPOINT; 
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const data = await req.json();
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const salt = bcrypt.genSaltSync(10);
  const hashedpass = bcrypt.hashSync(data.password, salt);
  try {

    const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;
    const endpoint = `https://chrome.browserless.io/scrape?token=${BROWSERLESS_TOKEN}`;
  
    const payload = {
      url: data.website,
      gotoOptions: { waitUntil: "networkidle2" },
      elements: [
        {
          "selector": "html",
        }
      ]
    };

    const resp = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const scrapeErr = await resp.json();
      throw new Error(`Browserless error: ${scrapeErr}`);
    }

    const scrapedData = await resp.json();
    const renderedHTML = scrapedData.data;
    const html = renderedHTML[0].results[0].html;
    console.log('htmlhtmlhtml', html);
    const $ = load(html)
    
    const text = $('body').text()
    const chunks = chunkText(text, 1000)

    const embeddings = []
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i]
      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: chunk,
      })

      const [{ embedding }] = embeddingRes.data
      embeddings.push({
        chunk,
        embedding,
      })
    }

    if (embeddings) {
      const formattedData = {...data, password: hashedpass, scrapedData: embeddings}
      const result = await db.collection('clients').insertOne(formattedData);
    
      if (result.acknowledged) {
        await fetch(ZAPIER_WEBHOOK, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: result.insertedId.toString(),
            email: data.email,
          }),
        });
      }
      return NextResponse.json({ success: true, data: result });
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
