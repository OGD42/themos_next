"use server";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/api/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const locale = await getLocale();
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const incomingData = {
    email,
    password,
  };

  const { error, data } = await supabase.auth.signInWithPassword(incomingData);
  if (!data.user?.user_metadata.email_verified) {
    redirect(`/${locale}/error/confirm`);
  }

  console.log("error on signin", error);
  if (error) {
    redirect(`/${locale}/error`);
  }
  revalidatePath("/", "layout");
  redirect(`/${locale}/dashboard`);
}

export async function signup({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const locale = await getLocale();
  console.log("LOCALE", locale);
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email,
    password,
  };

  const { error } = await supabase.auth.signUp(data);
  console.log("error on register", error);
  if (error) {
    redirect(`/${locale}/error`);
  }
  revalidatePath("/", "layout");
  redirect(`/${locale}/dashboard`);
}
