import { AssistantResponse } from "ai";
import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json();
  const input: {
    country: "canada" | "spain" | "usa" | "germany";
    threadId: string | null;
    message: string;
    locale: string;
  } = body;

  const ASSISTANT: { [key: string]: string } = {
    canada: process.env.CANADA_ASSISTANT_ID as string,
    spain: process.env.SPAIN_ASSISTANT_ID as string,
  };

  const response = await handleLanguage({
    message: body.message,
    locale: body.locale,
  });
  // body.country === "spain"
  //   ? await handleLanguage({
  //       message: body.message,
  //       locale: body.locale,
  //     })
  //   : await handleSpain(body.locale, body.message);

  const content = response.choices[0].message.content || "";
  // Create a thread if needed
  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content:
      body.locale === "en"
        ? content
        : `${content}. Return the response in standard Spanish`,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          ASSISTANT[input.country] ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === "requires_action" &&
        runResult.required_action?.type === "submit_tool_outputs"
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                case "getRoomTemperature": {
                  const temperature =
                    homeTemperatures[
                      parameters.room as keyof typeof homeTemperatures
                    ];

                  return {
                    tool_call_id: toolCall.id,
                    output: temperature.toString(),
                  };
                }

                case "setRoomTemperature": {
                  const oldTemperature =
                    homeTemperatures[
                      parameters.room as keyof typeof homeTemperatures
                    ];

                  homeTemperatures[
                    parameters.room as keyof typeof homeTemperatures
                  ] = parameters.temperature;

                  sendDataMessage({
                    role: "data",
                    data: {
                      oldTemperature,
                      newTemperature: parameters.temperature,
                      description: `Temperature in ${parameters.room} changed from ${oldTemperature} to ${parameters.temperature}`,
                    },
                  });

                  return {
                    tool_call_id: toolCall.id,
                    output: `temperature set successfully`,
                  };
                }

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`
                  );
              }
            }
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs }
          )
        );
      }
    }
  );
}

const homeTemperatures = {
  bedroom: 20,
  "home office": 21,
  "living room": 21,
  kitchen: 22,
  bathroom: 23,
};

async function handleLanguage({
  message,
  locale,
}: {
  message: string;
  locale: string;
}) {
  if (locale === "en") {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: messages.english,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return response;
  } else {
    const grammarCheck = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: messages.spanish,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    const fixedMessage = grammarCheck.choices[0].message.content || "";
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a sentence in Spanish, and your task is to translate it into English.",
        },
        {
          role: "user",
          content: fixedMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return response;
  }
}

async function handleSpain(language: string, message: string) {
  if (language === "es") {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: messages.spanish,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return response;
  } else {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: messages.english,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    const translatedToSpanish = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: messages.spanish,
        },
        {
          role: "user",
          content: response.choices[0].message.content || "",
        },
      ],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1,
    });
    return translatedToSpanish;
  }
}

const messages = {
  spanish:
    "You will be provided with statements in Spanish, and your task is to convert them to standard Spanish.",
  english:
    "You will be provided with statements, and your task is to convert them to standard English.",
};
