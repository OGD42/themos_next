"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

type ProsConsAccordionTypes = {
  pros: string[];
  cons: string[];
};
export default function ProsConsAccordion({
  pros,
  cons,
}: ProsConsAccordionTypes) {
  return (
    <Accordion variant="splitted" className="max-w-[100%]">
      <AccordionItem
        key="1"
        aria-label="Pros"
        title="Pros"
        style={{ whiteSpace: "pre-line" }}
      >
        {`${pros.map((i) => `> ${i}\n`)}`}
        {/* `> High salaries for doctors, engineers and nurses.\n> Free Healthcare.\n> Public Services.\n> Safe.` */}
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Cons"
        title="Cons"
        style={{ whiteSpace: "pre-line" }}
      >
        {`${cons.map((i) => `> ${i}\n`)}`}
        {/* {`> High Taxes.\n> High cost of living.\n> Taxed extra hours.`} */}
      </AccordionItem>
    </Accordion>
  );
}
