import React from "react";
import groq from "groq";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { client } from "@root/sanity/lib/client";
import BlogItem from "../_components/BlogItem";

type Props = {
  params: { locale: string };
};

export default async function CanadaBlog({ params: { locale } }: Props) {
  const posts = await client.fetch(groq`
      *[_type == "post" && language == "${locale}"] | order(publishedAt desc) {
        title,
        slug,
        mainImage,
        "authorName": author -> name,
      }
    `);

  return (
    <div className="container flex flex-col items-center justify-center px-4 py-16 antialiased z-20">
      <h3 className="text-3xl">Canada - Info & Blog</h3>
      <div className="flex flex-col gap-10 pt-4">
        {posts.map(
          (item: {
            authorName: string;
            mainImage: any;
            title: string;
            slug: { current: string };
          }) => (
            <BlogItem
              href={`/${locale}/blog/canada/${item.slug.current}`}
              title={item.title}
              author={item.authorName}
              image={item.mainImage.asset}
              key={`${item.slug.current}`}
            />
          )
        )}
      </div>
    </div>
  );
}
