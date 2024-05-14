"use client";
import { Button } from "@nextui-org/react";
import { FaPhone } from "react-icons/fa6";
import Image from "next/image";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "@/api/firebase";
import { useState, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import store from "@/api/store";
import { useRouter } from "next/navigation";

const provider = new GoogleAuthProvider();
provider.addScope("email");
provider.addScope("profile");

export default function StyledFirebaseAuth() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const userStore = store();

  useEffect(() => {
    const observer = onAuthStateChanged(auth, (u) => {
      if (u) {
        userStore.setUser(u);
        router.push("/dashboard");
      } else {
        console.log("no user");
      }
    });
    return () => {
      observer();
    };
  }, []);

  async function handleSignInWithGoogle() {
    try {
      setLoading(true);
      await auth.setPersistence(browserSessionPersistence);
      const result = await signInWithPopup(auth, provider);
      setLoading(false);
      userStore.setUser(result.user);
      router.replace("/dashboard");
    } catch (error) {
      console.log("error", error);
    }
  }
  return (
    <div className="flex flex-col">
      <h1>Sign-In here:</h1>
      {/* <Button startContent={<FaPhone />} className="my-2 w-[190px] h-10">
        Phone Number
      </Button> */}
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
      <LoadingIndicator isOpen={loading} onClose={() => setLoading(false)} />
    </div>
  );
}
