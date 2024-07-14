"use client";
import type { Message } from "ai/react";
import { Avatar } from "@nextui-org/react";
import { ReactTyped } from "react-typed";
import store from "@/api/store";

type MessageData = {
  description: string;
};

type MessageType = {
  message: Message;
};

export default function MessageItem({ message }: MessageType) {
  const useStore = store();
  return (
    <div
      className="whitespace-pre-wrap"
      style={{ color: roleToColorMap[message.role] }}
    >
      <div
        className={`flex items-center ${
          message.role === "assistant" ? "justify-end" : "justify-start"
        }`}
      >
        {message.role === "user" && <Avatar name="U" />}
        <span className="mx-2">
          <strong>{`${
            message.role === "assistant"
              ? "Themos"
              : useStore.user?.email || "User"
          }`}</strong>
        </span>
        {message.role === "assistant" && <Avatar name="T.AI" />}
      </div>
      <br />
      <div
        className={`${message.role === "assistant" ? "bg-white dark:bg-gray-800" : "bg-blue-500 dark:bg-blue-700"} p-4 rounded-lg shadow-md max-w-md`}
      >
        <p className="text-gray-800 dark:text-gray-300">
          {message.role !== "data" && message.content.replace(/\【.*?】/g, "")}
        </p>
      </div>

      {message.role === "data" && (
        <>
          <br />
          <pre className={"bg-gray-200"}>
            <ReactTyped
              strings={[JSON.stringify(message.data, null, 2)]}
              typeSpeed={40}
            />
          </pre>
        </>
      )}
      <br />
      <br />
    </div>
  );
}

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "white",
  function: "blue",
  tool: "purple",
  assistant: "green",
  data: "orange",
};
