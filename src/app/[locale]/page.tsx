import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import QuestionCarousel from "./_components/QuestionsCarousel";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import LanguageSelector from "./_components/language-selector";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return (
    <div className="container flex h-screen flex-col lg:flex-row items-center justify-center gap-12 px-4 py-16 z-10">
      <div className="flex flex-1 flex-col justify-center items-start">
        <h1 className="text-5xl font-extrabold sm:text-[5rem] py-2">
          <span className="text-blue-700">{t("themos_title")}</span>{" "}
          {t("themos_description")}
        </h1>
        <h3 className="text-2xl py-2">{t("home_title")}</h3>
        <StyledFirebaseAuth />
      </div>
      <div className="flex flex-col justify-center items-center lg:items-start bg-slate-700 rounded-small p-4">
        <h2 className="text-3xl">{t("home_ask_title")}</h2>
        <QuestionCarousel slides={Array.from(Array(5).keys())} />
      </div>
      <LanguageSelector />
    </div>
  );
}
