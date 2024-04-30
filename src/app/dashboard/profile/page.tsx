"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Input,
  Button,
} from "@nextui-org/react";
import useGetAuth from "@/api/hooks/useGetAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/api/firebase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const user = useGetAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.replace("/");
  }
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <Card className="max-w-[400px] z-20">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src={
              user?.photoURL
                ? user?.photoURL
                : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            }
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{user?.displayName}</p>
            <p className="text-small text-default-500">{user?.email}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Button isDisabled={true}>Edit</Button>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            onClick={handleLogout}
            className="cursor-pointer"
          >
            Logout
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
