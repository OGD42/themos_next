import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Canada from "@/assets/images/canada.jpg";
import Germany from "@/assets/images/germany.jpg";
import Spain from "@/assets/images/spain.jpg";
import USA from "@/assets/images/usa.jpg";
import CityCard from "./_components/CityCard";

type Props = {
  params: { locale: string };
};

export default function Dashboard({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Dashboard");

  const LOCATIONS: CityCardTypes[] = [
    {
      cityName: t("dashboard_canada_label"),
      title: t("dashboard_canada_citizenship_label"),
      subtitle: t("dashboard_canada_residence_label"),
      picture: Canada.src,
      pros: t("dashboard_canada_pros")
        .split(".")
        .filter((i) => i),
      cons: t("dashboard_canada_cons")
        .split(".")
        .filter((i) => i),
    },
    {
      cityName: t("dashboard_usa_label"),
      title: t("dashboard_usa_citizenship_label"),
      subtitle: t("dashboard_usa_residence_label"),
      picture: USA.src,
      pros: t("dashboard_usa_pros")
        .split(".")
        .filter((i) => i),
      cons: t("dashboard_usa_cons")
        .split(".")
        .filter((i) => i),
    },
    {
      cityName: t("dashboard_spain_label"),
      title: t("dashboard_spain_citizenship_label"),
      subtitle: t("dashboard_spain_residence_label"),
      picture: Spain.src,
      pros: t("dashboard_spain_pros")
        .split(".")
        .filter((i) => i),
      cons: t("dashboard_spain_cons")
        .split(".")
        .filter((i) => i),
    },
    {
      cityName: t("dashboard_germany_label"),
      title: t("dashboard_germany_citizenship_label"),
      subtitle: t("dashboard_germany_residence_label"),
      picture: Germany.src,
      pros: t("dashboard_germany_pros")
        .split(".")
        .filter((i) => i),
      cons: t("dashboard_germany_cons")
        .split(".")
        .filter((i) => i),
    },
  ];
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 antialiased z-20">
      <h1 className="text-xl font-extrabold tracking-tight sm:text-[2rem]">
        {t("dashboard_migrate_to_label")}
      </h1>
      <div className="flex flex-grow flex-row flex-wrap justify-center gap-4">
        {LOCATIONS.map((card, index) => (
          <CityCard key={`cc_${index}`} {...card} />
        ))}
      </div>
    </div>
  );
}

type CityCardTypes = {
  cityName: string;
  title: string;
  subtitle: string;
  picture: string;
  pros: string[];
  cons: string[];
};
