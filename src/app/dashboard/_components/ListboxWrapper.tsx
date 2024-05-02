"use client";
import { useState, useMemo } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import useStore from "@/api/store";
import { database } from "@/api/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  Timestamp,
  WithFieldValue,
  collection,
} from "firebase/firestore";
import { Listbox, ListboxItem } from "@nextui-org/react";
import moment from "moment";
import { Message } from "ai";
import MessageItem from "./message_item";

interface HistoryDataType {
  id: string;
  firstMessage: string;
  messages: {
    id: string;
    tool_call_id?: string;
    createdAt?: Date;
    content: string;
    ui?: string | JSX.Element | JSX.Element[] | null | undefined;
    role: "system" | "user" | "assistant" | "function" | "data" | "tool";
  }[];
  created_at: Timestamp;
  updated_at: Timestamp;
  user_id: string;
}

const postConverter: FirestoreDataConverter<HistoryDataType> = {
  toFirestore(post: WithFieldValue<HistoryDataType>): DocumentData {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): HistoryDataType {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user_id: data.user_id,
      firstMessage: data.firstMessage,
      messages: data.messages,
    };
  },
};

export const ListboxWrapper = () => {
  const user = useStore();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const [value, loading, error] = useCollectionData(
    collection(database, "conversation").withConverter(postConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  async function manageSelection(keys: Set<string>) {
    setSelectedKeys(keys);
  }

  const findMessages = value?.find((c) => c.id === selectedValue);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <div className="w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
        <Listbox
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onSelectionChange={manageSelection as any}
        >
          {value ? (
            value.map((i) => (
              <ListboxItem key={i.id}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">
                      {i.firstMessage.substring(0, 25)}...
                    </span>
                    <span className="text-tiny text-default-400">
                      {`Conversation ${moment(i.created_at.toDate()).format(
                        "MM/DD/YYYY"
                      )}`}
                    </span>
                  </div>
                </div>
              </ListboxItem>
            ))
          ) : (
            <ListboxItem key="No Data">No Data</ListboxItem>
          )}
        </Listbox>
      </div>
      <div className="flex flex-1 flex-col p-5 lg:p-10">
        {findMessages?.messages.map((message) => (
          <MessageItem key={`mi_${message.id}`} message={message as any} />
        ))}
      </div>
    </div>
  );
};
