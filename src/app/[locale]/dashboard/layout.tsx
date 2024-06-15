import { Metadata } from "next";
import { SITE_URL } from "@/utils/helpers";

export const metadata: Metadata = {
  title: "Dashboard - Choose your country",
  description: "Your Migration assistant",
  applicationName: "Themos.ai",
  authors: {
    url: "Oscargallo.dev",
    name: "Oscar Gallo",
  },
  openGraph: {
    title: "Themos.ai - Migrate anywhere",
    description: "Your Migration assistant",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
  },
  keywords: [
    "migration Lawyer",
    "abogado de migración",
    "asistente de migración",
    "migrate to Canada",
    "migrate to Germany",
    "move to Germany",
    "emigrar a Canada",
    "emigrar a Alemania",
    "migrate to Spain",
    "move to Spain",
    "emigrar a España",
    "migrate to Mexico",
    "move to Mexico",
    "emigrar a Mexico",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
