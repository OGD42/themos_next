import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import QuestionCarousel from "./_components/QuestionsCarousel";
import LoginForm from "./_components/login-form";
import StyledFirebaseAuth from "@/components/StyledFirebaseAuth";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Index");
  return (
    <div className="container flex min-h-screen w-[90%] flex-col items-center justify-center gap-12 z-10 lg:w-[40%]">
      <div className="flex flex-1 flex-col justify-center items-start p-2 gap-5 pt-5">
        <h1 className="lg:text-5xl font-extrabold text-[3rem] py-2 lg:leading-relaxed">
          <span className="text-blue-700">{t("themos_title")}</span>{" "}
          {t("themos_description")}
        </h1>
        <h3 className="text-xl py-2">{t("home_title")}</h3>
        <StyledFirebaseAuth />
      </div>
      <div className="flex flex-col flex-1 justify-center items-start lg:items-star rounded-small p-2">
        <h2 className="text-3xl">{t("home_ask_title")}</h2>
        <QuestionCarousel />
      </div>
    </div>
  );
}
