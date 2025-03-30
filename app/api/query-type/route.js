import clientPromise from "@/lib/mongodb";
import { getDbName } from "@/lib/utils";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  const DB_NAME = getDbName(data.organization)
  const client = await clientPromise;
  const db = client.db(DB_NAME);

  try {
      const ipResponse = await fetch('https://ipwho.is/', {
        method: 'GET',
      });

      const ipData = await ipResponse.json();

      const systemMessage = {
        role: 'system',
        content: `You are a helpful assistant. Your job is to classify the conversation
                  as either a 'Complaint', 'Feedback', or 'General query' only. Only answer with the mentioned options.
                  DO NOT VIOLATE THIS!`
      };

      const conversationTypeInstructions = [...data.messages, systemMessage];
    
      const conversationTypeRes = await generateText({
        model: openai('gpt-4o-mini'),
        messages: conversationTypeInstructions,
        temperature: 0
      });

  
      if (conversationTypeRes.text && data.messages[data.messages.length - 1].content !== '(Streaming response...)') {
        const chatCursor = await db.collection('chats').find({ "chat_id": data.id }).toArray();

        if (chatCursor.length > 0) {
            const result = await db.collection('chats').updateOne(
                { "chat_id": data.id },
                {
                  $set: {
                    queryType: conversationTypeRes.text,
                    ip: ipData.ip,
                    country: ipData.country,
                    flag: ipData.flag,
                    messages: data.messages
                  },
                  $currentDate: { lastModified: true }
                }
            );
            return NextResponse.json({ success: true, data: result });
          } else {
            result = await db.collection('chats').insertOne({
              queryType: conversationTypeRes.text,
              ip: ipData.ip,
              country: ipData.country,
              flag: ipData.flag,
              messages: data.messages
            });

            return NextResponse.json({ success: true, data: result });
          }
      }
      
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
