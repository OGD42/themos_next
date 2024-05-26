import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { Providers } from "./providers";
import { BackgroundBeams } from "./_components/background-beams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Themos.ai",
  description: "Your Migration assistant",
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
              {children}
            </NextIntlClientProvider>
            <BackgroundBeams />
          </main>
        </Providers>
      </body>
    </html>
  );
}
