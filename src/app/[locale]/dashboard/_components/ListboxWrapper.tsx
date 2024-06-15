"use client";
import { useState, useMemo } from "react";
import useStore from "@/api/store";
import { Listbox, ListboxItem } from "@nextui-org/react";
import moment from "moment";
import MessageItem from "./message_item";
import useGetHistory from "@/api/hooks/useGetHistory";

type HistoryChat = {
  country: "canada" | "spain" | "usa" | "germany";
};

export const ListboxWrapper = ({ country }: HistoryChat) => {
  const user = useStore();
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );
  const { data: historyData } = useGetHistory(country);

  function manageSelection(keys: Set<string>) {
    setSelectedKeys(keys);
  }

  const findMessages = historyData?.find((c) => c.id === selectedValue);

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
          {historyData ? (
            historyData.map((i) => (
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
