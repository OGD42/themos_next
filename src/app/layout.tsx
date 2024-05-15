import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <main className="flex min-h-screen flex-col items-center text-white overflow-hidden">
            {children}
            <BackgroundBeams />
          </main>
        </Providers>
      </body>
    </html>
  );
}
