"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";

type PropType = {
  options?: EmblaOptionsType;
};

const QuestionCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, axis: "y" }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);
  const t = useTranslations("Index");

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
  }, [emblaApi]);

  const QUESTIONS = [
    t("home_question1"),
    t("home_question2"),
    t("home_question3"),
    t("home_question4"),
    t("home_question5"),
  ];

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {QUESTIONS.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <Card key={`qci_${index}`} style={{ maxWidth: "80%" }}>
                  <CardBody style={{ fontSize: "1.2rem" }}>{item}</CardBody>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCarousel;
