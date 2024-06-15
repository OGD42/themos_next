import useStore from "@/api/store";
import { database } from "@/api/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { IHistoryData } from "@/api/types";
import { useEffect, useState } from "react";

export default function useGetHistory(country: string = "canada") {
  const [state, setState] = useState<{
    data: IHistoryData[];
    loading: boolean;
    error: boolean;
  }>({
    data: [],
    loading: false,
    error: false,
  });
  const user = useStore();
  useEffect(() => {
    async function loadData() {
      try {
        const q = query(
          collection(database, "conversation").withConverter(postConverter),
          where("country", "==", country)
        );
        const querySnapshot = await getDocs(q);
        const conversations = querySnapshot.docs.map((i) => i.data());
        setState((prevState) => ({
          ...prevState,
          data: conversations,
          error: false,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: true,
        }));
      }
    }
    loadData();
  }, [user, country]);
  return { ...state };
}

const postConverter: FirestoreDataConverter<IHistoryData> = {
  toFirestore(post: WithFieldValue<IHistoryData>): DocumentData {
    return post;
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): IHistoryData {
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
