"use client";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Chat from "../_components/chat";
import Stepper from "../_components/Stepper";
import { ListboxWrapper } from "../_components/ListboxWrapper";
import { useTranslations } from "next-intl";

type Props = {
  params: { locale: string };
};

export default function Canada({ params: { locale } }: Props) {
  const t = useTranslations("Migrate_To");
  return (
    <div className="my-10 flex w-full p-10 z-10 justify-center items-center">
      <div className="flex flex-col w-full md:w-[80%] lg:w-[70%] xl:w-[50%]">
        <h1 className="my-2 text-4xl font-bold py-3">
          {t("migrate_canada_label")}
        </h1>
        <Tabs aria-label="Options">
          <Tab key="free" title={t("migrate_ask_label")}>
            <Card>
              <CardBody className="text-white">
                <Chat country="canada" />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="guide" title={t("migrate_guide_me_label")}>
            <Card>
              <CardBody>
                <Stepper />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="history" title={t("migrate_history_label")}>
            <Card>
              <CardBody>
                <ListboxWrapper country="canada" />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
