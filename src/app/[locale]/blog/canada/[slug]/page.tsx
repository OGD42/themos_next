import type { Metadata } from "next";
import { Avatar } from "@nextui-org/react";
import { client } from "@root/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import moment from "moment";
import { urlFor } from "@/utils/helpers";

type Props = {
  params: { locale: string; slug: string };
};

export default async function CanadaPost({ params: { slug } }: Props) {
  console.log("SLUG", slug);
  const blogPost = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
        "authorName": author -> name,
        _createdAt,
        title,
        slug,
        mainImage,
        body
    }
  `,
    { slug }
  );
  console.log("blogPost", blogPost);
  const imageWithURL = urlFor(blogPost.mainImage, client);
  return (
    <div className="container flex flex-col justify-center py-16 antialiased z-20 items-start lg:max-w-lg gap-5 px-6 lg:px-0">
      <div className="flex flex-row justify-center">
        <Avatar
          isBordered
          color="default"
          src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        />
        <div className="flex flex-col px-4 items-start justify-center">
          <span className="font-bold">{blogPost.authorName}</span>
          <span className="text-slate-400">
            {moment(blogPost._createdAt).format("MMMM Do YYYY")}
          </span>
        </div>
      </div>
      <h1 className="text-5xl font-bold py-3">{blogPost.title}</h1>
      <Image
        alt={blogPost.title}
        className="z-0 w-full h-[200px] object-cover"
        src={imageWithURL.url()}
        width={500}
        height={200}
      />
      <PortableText
        value={[...blogPost.body]}
        components={{
          list: ({ children }) => (
            <ul className="list-decimal w-full list-inside">{children}</ul>
          ),
          block: {
            h3: ({ children }) => <h3 className="text-3xl">{children}</h3>,
            h4: ({ children }) => (
              <h3 className="text-3xl font-bold w-full">{children}</h3>
            ),
            normal: ({ children }) => <p className="w-full">{children}</p>,
          },
        }}
      />
    </div>
  );
}
