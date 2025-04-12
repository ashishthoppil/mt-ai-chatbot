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
        const $ = load(html);
        const text = $('body').text();

        // Updated Image Processing
        let imageEmbeddings = [];

        const imagePromises = $('img').map(async (index, element) => {
            let src = $(element).attr('src');
            const alt = $(element).attr('alt') || "No alt text available";

            if (src) {
                // Convert relative URLs to absolute URLs
                if (!src.startsWith('http') && !src.startsWith('ftp')) {
                    src = new URL(src, link).href;
                }

                try {
                    // Fetch image and encode in base64
                    const imageResponse = await fetch(src);
                    if (!imageResponse.ok) throw new Error(`Failed to fetch image: ${src}`);

                    const imageBuffer = await imageResponse.arrayBuffer();
                    const imageBase64 = Buffer.from(imageBuffer).toString('base64');

                    // Generate image embedding using OpenAI CLIP model
                    const embeddingRes = await openai.embeddings.create({
                        model: "text-embedding-ada-002", // Use CLIP or a vision model
                        input: imageBase64,
                    });

                    const [{ embedding }] = embeddingRes.data.data;

                    // Store image details and embeddings
                    imageEmbeddings.push({
                        imageUrl: src,
                        alt,
                        embedding,
                    });

                } catch (err) {
                    console.warn(`Error processing image: ${src}`, err);
                }
            }
        }).get();

        await Promise.all(imagePromises);

        const intermediateChunk = chunkText(text, 5000);
        for (const ic of intermediateChunk) {
            chunks.push(`The reference url for the following data is ${link} - ${ic}`);
        }

        if (chunks.length > 0) {
            const embeddings = [];
            for (let i = 0; i < chunks.length; i++) {
                const chunk = chunks[i];
                const embeddingRes = await openai.embeddings.create({
                    model: 'text-embedding-ada-002',
                    input: chunk,
                });

                if (embeddingRes) {
                    const [{ embedding }] = embeddingRes.data;
                    embeddings.push({
                        chunk,
                        embedding,
                    });  
                }
            }

            if (embeddings.length > 0 || imageEmbeddings.length > 0) {
                const result = await db.collection('knowledge_base').insertOne({ embeddings, imageEmbeddings });
                const prevLinks = await db.collection('links').find().toArray();
                const workLinks = prevLinks[0].links;
                let updatedLinks = [];
                if (workLinks.length > 0) {
                    updatedLinks = workLinks.map((item) => {
                        if (item.link === link) {
                            return {
                                link,
                                status: 'completed'
                            };
                        } else {
                            return {
                                link: item.link,
                                status: item.status === 'completed' ? 'completed' : 'pending',
                            };
                        }
                    });

                    await db.collection('links').updateOne(
                        {},
                        {
                            $set: { links: updatedLinks },
                            $currentDate: { lastModified: true }
                        }
                    );
                } else {
                    await db.collection('links').insertOne({ links: [] });
                }
                return NextResponse.json({ success: true, message: updatedLinks });
            }
        }

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
