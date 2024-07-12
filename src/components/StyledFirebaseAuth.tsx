"use client";
import Image from "next/image";
import Link from "next/link";
import { PiSignIn } from "react-icons/pi";
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserSessionPersistence,
} from "firebase/auth";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Link as UILink,
} from "@nextui-org/react";
import { auth } from "@/api/firebase";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import store from "@/api/store";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import useGetAuth from "@/api/hooks/useGetAuth";

const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");

export default function StyledFirebaseAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userStore = store();
  const t = useTranslations("Index");
  const locale = useLocale();
  const { user, isLoading } = useGetAuth();

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      await auth.setPersistence(browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      userStore.setUser(result.user);
      router.replace(`/${locale}/dashboard`);
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-3">
        <PiSignIn size={40} />
        <div className="flex flex-col">
          <p className="text-md">Login</p>
          <p className="text-small text-default-500">
            {t("home_sign_in_here")}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        {user && userStore.user ? (
          <div className="flex flex-col">
            <p className="text-lg">You &apos;re already logged</p>
            <p className="text-small text-default-500">
              Want to go to Dashboard?
            </p>
            <UILink href={`/${locale}/dashboard`} as={Link}>
              Go to Dashboard
            </UILink>
          </div>
        ) : (
          <Button
            onClick={handleSignInWithGoogle}
            className="my-2 w-[190px] h-10"
            startContent={
              <Image
                className=" h-5 w-5"
                alt=""
                width={40}
                height={40}
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              ></Image>
            }
          >
            Google
          </Button>
        )}
      </CardBody>
      <CardFooter>
        <LoadingIndicator isOpen={loading} onClose={() => setLoading(false)} />
      </CardFooter>
    </Card>
  );
}
