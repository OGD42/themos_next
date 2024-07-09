"use client";
import { startTransition } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
  Link as UILink,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login, signup } from "../action";
import useGetAuth from "@/api/hooks/useGetAuth";
import Link from "next/link";

type LoginFormType = {
  email: string;
  password: string;
};

export default function LoginPage({ locale }: { locale: string }) {
  const { register, handleSubmit, getValues, setError } =
    useForm<LoginFormType>({
      defaultValues: { email: "", password: "" },
      resolver: zodResolver(validation),
    });

  const { isLoading, user } = useGetAuth();

  async function _handleSubmit(values: LoginFormType) {
    startTransition(() => {
      login(values);
    });
  }

  async function _handleRegister() {
    const values = getValues();
    if (values.email.length > 0 && values.password.length > 0) {
      startTransition(() => {
        signup(values);
      });
    }
  }
  console.log("user", user);
  if (user) {
    return (
      <Card className="max-w-full lg:w-5/6 pt-2 my-4">
        <CardHeader className="flex gap-3">
          {/* <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          /> */}
          <div className="flex flex-col">
            <p className="text-lg">You &apos;re already logged</p>
            <p className="text-small text-default-500">
              Want to go to Dashboard?
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <UILink href={`/${locale}/dashboard`} as={Link}>
            Go to Dashboard
          </UILink>
        </CardBody>
      </Card>
    );
  }
  return (
    <form
      className="w-full lg:w-5/6 pt-2"
      onSubmit={handleSubmit(_handleSubmit)}
    >
      <Card className="max-w-full">
        <CardHeader className="flex gap-3">
          {/* <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          /> */}
          <div className="flex flex-col">
            <p className="text-md">Login</p>
            <p className="text-small text-default-500">
              Fill the info to continue
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Input
            {...register("email")}
            placeholder="Email"
            label="Email"
            className="my-2"
          />
          <Input
            {...register("password")}
            placeholder="Password"
            label="Password"
            className="my-2"
            type="password"
          />
          <Button type="submit" color="primary" className="my-2">
            Login
          </Button>
        </CardBody>
        <div className="flex justify-center items-center gap-2 flex-col px-10">
          <Divider />
          <span className="font-bold">OR</span>
          <Divider />
        </div>
        <CardFooter>
          <Button color="secondary" variant="light" onClick={_handleRegister}>
            Register
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

const validation = z.object({
  email: z.string().min(3),
  password: z.string().min(6),
});
