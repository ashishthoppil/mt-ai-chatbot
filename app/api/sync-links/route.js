import { chunkText } from "@/lib/chunkText";
import clientPromise from "@/lib/mongodb";
import { load } from "cheerio";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const client = await clientPromise;
    const DB_NAME = process.env.DB_NAME;
    const db = client.db(DB_NAME);
    const request = await req.json();
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const sanitizedLinks = []
        request.links.forEach(item => {
          if (item) {
            sanitizedLinks.push(item)
          }
        });

        let chunks = [];
        for (const url of sanitizedLinks) {
            const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;
            const endpoint = `https://chrome.browserless.io/scrape?token=${BROWSERLESS_TOKEN}`;

            const payload = {
                url,
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
            const $ = load(html)
            const text = $('body').text()
            const intermediateChunk = chunkText(text, 10000);
            chunks = chunks.concat(intermediateChunk);
        }

        if (chunks.length > 0) {
            const embeddings = [];
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const embeddingRes = await openai.embeddings.create({
                    model: 'text-embedding-ada-002',
                    input: chunk,
                })
        
                if (embeddingRes) {
                    const [{ embedding }] = embeddingRes.data
                    embeddings.push({
                        chunk,
                        embedding,
                    });  
                }
            }

            if (embeddings.length > 0) {
                const result = await db.collection('clients').updateOne(
                    { _id: new ObjectId(request.id) },
                    {
                      $set: { links: sanitizedLinks, scrapedData: embeddings },
                      $currentDate: { lastModified: true }
                    }
                );

                return NextResponse.json({ success: true, message: result });
            }
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
