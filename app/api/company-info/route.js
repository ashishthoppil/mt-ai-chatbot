import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const bcrypt = require('bcrypt');

async function crawlWithPuppeteer(startUrl, baseDomain) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const visited = new Set();
  const toVisit = [startUrl];
  const foundUrls = [];

  while (toVisit.length > 0) {
    const currentUrl = toVisit.shift();
    if (visited.has(currentUrl)) continue;
    visited.add(currentUrl);

    try {
      await page.goto(currentUrl, { waitUntil: 'networkidle2' });

      foundUrls.push(currentUrl);

      // Extract all 'a' tags
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
          .map(a => a.getAttribute('href'))
          .filter(Boolean);
      });

      for (let href of links) {
        // Skip anchors or external links
        if (href.startsWith('#')) continue;
        if (href.startsWith('/')) {
          href = baseDomain + href;
        }
        if (href.startsWith(baseDomain)) {
          toVisit.push(href);
        }
      }
    } catch (err) {
      console.error(`Error crawling ${currentUrl}:`, err);
    }
  }

  await browser.close();
  return foundUrls;
}

export async function POST(req, res) {
  const DB_NAME = process.env.DB_NAME
  const ZAPIER_WEBHOOK = process.env.ZAPIER_WEBHOOK;
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const data = await req.json();

  const salt = bcrypt.genSaltSync(10);
  const hashedpass = bcrypt.hashSync(data.password, salt);
  try {
      const formattedData = { ...data, password: hashedpass }
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
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
