import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { BackgroundBeams } from "./_components/background-beams";
import { SITE_URL } from "@/utils/helpers";
import NavigationBar from "./_components/navigation-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Themos.ai - We help you find your perfect country.",
  description: "Your AI Migration assistant",
  applicationName: "Themos.ai",
  authors: {
    url: "Oscargallo.dev",
    name: "Oscar Gallo",
  },
  openGraph: {
    title: "Themos.ai - Migrate anywhere",
    description: "Your AI Migration assistant",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
  },
  keywords: [
    "migrate",
    "emigrar",
    "canada",
    "move",
    "ai assistant",
    "spain",
    "mexico",
    "usa",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center text-white overflow-hidden">
            <NextIntlClientProvider messages={messages}>
              <NavigationBar />
              {children}
            </NextIntlClientProvider>
            <BackgroundBeams />
          </main>
        </Providers>
      </body>
    </html>
  );
}
