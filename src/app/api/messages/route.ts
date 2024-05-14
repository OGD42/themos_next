import { AssistantResponse } from "ai";
import { headers } from "next/headers";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  // console.log("request data", req.headers);
  console.log("request auth", req.headers.get("__session"));
  try {
    // Create a thread if needed
    const threadId = body.threadId;
    // Add a message to the thread
    const thread = await openai.beta.threads.retrieve(threadId);
    const createdMessage = await openai.beta.threads.messages.list(thread.id);
    return Response.json({ data: createdMessage });
  } catch (error) {
    console.log("error", error);
    return new Response("Not found", {
      status: 404,
    });
  }
}
