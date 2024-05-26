"use client";
import useGetAuth from "@/api/hooks/useGetAuth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useGetAuth();
  if (user) {
    return children;
  } else {
    return <h1>Not logged</h1>;
  }
}
