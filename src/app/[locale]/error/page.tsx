import { Link } from "@nextui-org/react";
import NextLink from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col z-10">
      <p className="text-2xl font-bold">Sorry, something went wrong</p>
      <Link href="/" as={NextLink} className="py-2">
        Go Back Home
      </Link>
    </div>
  );
}
