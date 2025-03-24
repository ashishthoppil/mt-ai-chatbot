import { chunkText } from "@/lib/chunkText";
import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { load } from "cheerio";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const request = await req.json();

    const client = await clientPromise;
    const DB_NAME = getDbName(request.organization);
    const db = client.db(DB_NAME);
    
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const deletion = await db.collection('knowledge_base').drop();
        const link = request.link.link;

        let chunks = [];
        const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN;
            const endpoint = `https://chrome.browserless.io/scrape?token=${BROWSERLESS_TOKEN}`;

            const payload = {
                url: link,
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
            const text = $('body').text();

            let imageUrls = 'This is a set of image urls from this page. \n'
            $('img').each((index, element) => {
                let src = '';
                if ($(element).attr('src').includes('https') || $(element).attr('src').includes('ftp')) {
                    src = $(element).attr('src');
                } else {
                    src = link + $(element).attr('src').slice(1);
                }
                const alt = $(element).attr('alt'); 
                if (src) {
                  imageUrls += `Image url for ${alt} - ${src}\n`;
                }
            });

            const intermediateChunk = chunkText(text, 5000);
            for (const ic of intermediateChunk) {
                chunks.push(`The reference url for the following data is ${link} - ${ic} \n ${imageUrls}`);
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
                const result = await db.collection('knowledge_base').insertOne({ embeddings });
                const prevLinks = await db.collection('links').find().toArray();

                const updatedLinks = prevLinks[0].links.map((item) => {
                    if (item.link === link) {
                        return {
                            link,
                            status: 'completed'
                        }
                    } else {
                        return item
                    }
                })
                await db.collection('links').updateOne(
                    {},
                    {
                        $set: { links: updatedLinks },
                        $currentDate: { lastModified: true }
                    }
                );
                return NextResponse.json({ success: true, message: updatedLinks });
            }
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
