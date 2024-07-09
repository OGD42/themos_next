import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { updateSession } from "./api/supabase/middleware";

const intMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "es"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(es|en)/:path*"],
};

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  return intMiddleware(request);
}
