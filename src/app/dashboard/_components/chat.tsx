"use client";
import { type Message, useAssistant } from "ai/react";
import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useMemo, useRef } from "react";
import MessageItem from "./message_item";
import { database } from "@/api/firebase";
import store from "@/api/store";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

type ChatType = {
  country: "canada" | "spain" | "usa" | "germany";
  thread?: string;
};
export default function Chat({ country, thread }: ChatType) {
  const useStore = store();
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    threadId,
  } = useAssistant({
    api: "/api/assistant",
    threadId: thread,
    body: {
      country,
    },
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  const messagesLength = useMemo(() => messages.length, [messages]);

  useEffect(() => {
    async function handleSaveThread() {
      if (threadId && useStore.user) {
        const savedThread = useStore.activeThreadId === threadId;
        if (savedThread) return;
        useStore.setThreadId(threadId);
        const findMessage = messages.find((i) => i.role === "user");
        if (findMessage) {
          await addDoc(collection(database, "conversation"), {
            thread_id: threadId,
            user_id: useStore.user?.uid,
            created_at: new Date(),
            updated_at: new Date(),
            firstMessage: findMessage.content,
            messages,
          });
        }
      }
    }
    handleSaveThread();
  }, [threadId, useStore]);

  useEffect(() => {
    async function manageAddMessages() {
      if (messages.length > 0 && threadId && status !== "awaiting_message") {
        const conversationQuery = query(
          collection(database, "conversation"),
          where("thread_id", "==", threadId)
        );
        const findConversation = await getDocs(conversationQuery);
        if (findConversation.empty) {
          return;
        }
        const data = findConversation.docs[0];
        await updateDoc(doc(database, "conversation", data.id), {
          messages: messages,
        });
      }
    }
    manageAddMessages();
  }, [messages, threadId, messagesLength, status]);

  async function _handleSubmit() {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        threadId: "",
      }),
    });
    return true;
  }
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
        onSubmit={_handleSubmit}
        className="flex flex-row items-center flex-wrap lg:flex-nowrap"
      >
        <Textarea
          ref={inputRef}
          multiple
          minRows={2}
          disabled={status !== "awaiting_message"}
          // className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
          value={input}
          placeholder="Describe us your case"
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
