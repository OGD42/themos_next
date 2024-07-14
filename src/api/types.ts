import { Timestamp } from "firebase/firestore";

export type TInvite = {
  user: string;
  invitedEmail: string;
};

export interface IHistoryData {
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
