import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";
import QuestionCarousel from "./_components/QuestionsCarousel";
import LanguageSelector from "./_components/language-selector";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return (
    <div className="container flex h-screen flex-col lg:flex-row items-center justify-center gap-12 z-10">
      <div className="flex flex-1 flex-col justify-center items-start p-2">
        <h1 className="lg:text-5xl font-extrabold text-[3rem] py-2">
          <span className="text-blue-700">{t("themos_title")}</span>{" "}
          {t("themos_description")}
        </h1>
        <h3 className="text-xl py-2">{t("home_title")}</h3>
        <StyledFirebaseAuth />
      </div>
      <div className="flex flex-col flex-1 justify-center items-center lg:items-start bg-slate-700 rounded-small w-[90%] p-2">
        <h2 className="text-3xl">{t("home_ask_title")}</h2>
        <QuestionCarousel slides={Array.from(Array(5).keys())} />
      </div>
      <LanguageSelector />
    </div>
  );
}
