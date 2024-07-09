import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";
import NextImage from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@root/sanity/lib/client";

type BlogItemType = {
  title: string;
  author: string;
  href: string;
  image: {
    _ref: string;
    _type: string;
  };
};

export default function BlogItem({ title, image, author, href }: BlogItemType) {
  return (
    <Link href={href}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7 z-10"
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          {/* <p className="text-tiny text-white/60 uppercase font-bold">
          Your day your way
        </p> */}
          {/* <h4 className="text-white/90 font-medium text-xl">{title}</h4> */}
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={urlFor(image).url()}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black object-cover"
              src="https://flagcdn.com/ca.svg"
            />
            <div className="flex flex-col">
              <p className="text-lg text-white/60">{title}</p>
              <p className="text-tiny text-white/60">{author}</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Read More
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

function urlFor(source: { _ref: string; _type: string }) {
  return imageUrlBuilder(client).image(source);
}
