"use client";
import { type Message, useAssistant } from "ai/react";
import { Button, Input } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import MessageItem from "./message_item";

type ChatType = {
  country: "canada" | "spain" | "usa" | "germany";
};
export default function Chat({ country }: ChatType) {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/assistant",
      body: {
        country,
      },
    });
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {error != null && (
        <div className="relative rounded-md bg-red-500 px-6 py-4 text-white">
          <span className="block sm:inline">
            Error: {(error as Error).toString()}
          </span>
        </div>
      )}

      {messages.length > 0 &&
        messages.map((m: Message) => <MessageItem key={m.id} message={m} />)}

      {status === "in_progress" && (
        <div className="mb-8 h-8 w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600" />
      )}

      <form
        onSubmit={submitMessage}
        className="flex flex-row items-center flex-wrap lg:flex-nowrap"
      >
        <Input
          ref={inputRef}
          multiple
          disabled={status !== "awaiting_message"}
          // className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Describe us your case in detail:"
          onChange={handleInputChange}
        />
        <Button
          className="px-8 mx-1 my-2 lg:my-0"
          type="submit"
          color="default"
        >
          Generate answer
        </Button>
      </form>
    </div>
  );
}
