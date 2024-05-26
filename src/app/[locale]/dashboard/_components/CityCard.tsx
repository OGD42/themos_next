"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { useLocale } from "next-intl";
import Link from "next/link";

type CityCardTypes = {
  cityName: string;
  title: string;
  subtitle: string;
  picture: string;
  pros: string[];
  cons: string[];
};
export default function CityCard({
  cityName,
  subtitle,
  title,
  picture,
  pros,
  cons,
}: CityCardTypes) {
  const locale = useLocale();
  return (
    <Card className="py-4 max-w-[360px] w-[360px]">
      {cityName === "Canada" ? (
        <Link href={`/${locale}/dashboard/canada`}>
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
            <h4 className="text-xl font-bold uppercase">{cityName}</h4>
            <p className="text-tiny font-bold">{title}</p>
            <small className="text-default-500">{subtitle}</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Image
              alt="Card background"
              className="rounded-xl object-cover"
              src={picture}
              width={360}
            />
          </CardBody>
        </Link>
      ) : (
        <>
          <CardHeader className="flex-col items-start px-4 pb-0 pt-2 cursor-not-allowed	">
            <h4 className="text-xl font-bold uppercase">{cityName}</h4>
            <p className="text-tiny font-bold">{title}</p>
            <small className="text-default-500">{subtitle}</small>
          </CardHeader>
          <CardBody className="overflow-visible py-2 cursor-not-allowed	">
            <Image
              alt="Card background"
              className="rounded-xl object-cover"
              src={picture}
              width={360}
            />
          </CardBody>
        </>
      )}
      <Accordion variant="splitted" className="max-w-[100%]">
        <AccordionItem
          key="1"
          aria-label="Pros"
          title="Pros"
          style={{ whiteSpace: "pre-line" }}
        >
          {`${pros.map((i) => `> ${i}\n`).join("")}`}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Cons"
          title="Cons"
          style={{ whiteSpace: "pre-line" }}
        >
          {`${cons.map((i) => `> ${i}\n`).join("")}`}
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
