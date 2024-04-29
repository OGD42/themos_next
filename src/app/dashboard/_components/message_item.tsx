"use client";
import type { Message } from "ai/react";
import { Avatar } from "@nextui-org/react";
import { ReactTyped } from "react-typed";

type MessageData = {
  description: string;
};

type MessageType = {
  message: Message;
};

export default function MessageItem({ message }: MessageType) {
  return (
    <div
      className="whitespace-pre-wrap"
      style={{ color: roleToColorMap[message.role] }}
    >
      <div
        className={`flex items-center ${message.role === "assistant" ? "justify-end" : "justify-start"}`}
      >
        {message.role === "user" && <Avatar name="T.AI" />}
        <span className="mx-2">
          <strong>{`${message.role === "assistant" ? "Themos" : "Usuario"}`}</strong>
        </span>
        {message.role === "assistant" && <Avatar name="T.AI" />}
      </div>
      <br />
      {message.role !== "data" && message.content}
      {message.role === "data" && (
        <>
          <br />
          <pre className={"bg-gray-200"}>
            <ReactTyped
              strings={[JSON.stringify(message.data, null, 2)]}
              typeSpeed={40}
            />
            {/* {JSON.stringify(message.data, null, 2)} */}
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
