"use client";
import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody } from "@nextui-org/react";

const QUESTIONS = [
  "I want to move to Canada to study, how can I do that?",
  "I want to move to Canada to build a Startup, what's the best visa for me?",
  "Can I bring my pets if I move to Canada?",
  "Can I move to Spain if I work remote in America?",
  "Can I move to Mexico if I work remote back home?",
];

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const QuestionCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
  }, [emblaApi]);

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
