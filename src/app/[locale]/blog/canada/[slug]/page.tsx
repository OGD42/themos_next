import type { Metadata, ResolvingMetadata } from "next";
import { client } from "@root/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import NextImage from "next/image";
import moment from "moment";
import { urlFor } from "@/utils/helpers";
import AUTHOR_IMAGE from "@/assets/authors/oscar.jpg";

type Props = {
  params: { locale: string; slug: string };
};
const BASE_URL = "https://themos.ai";

export async function generateMetadata(
  { params: { slug, locale } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
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

  const imageWithURL = urlFor(blogPost.mainImage, client);
  return {
    title: `${blogPost.title} - Themos.ai`,
    description: `${blogPost.title} - Learn more at Themos.ai`,
    openGraph: {
      url: `${BASE_URL}/${locale}/blog/canada/${blogPost.slug.current}`,
      siteName: "Next.js",
      images: [
        {
          url: imageWithURL.url(),
          alt: blogPost.title,
        },
      ],
    },
  };
}

// export const metadata: Metadata = {
//   openGraph: {
//     title: "Next.js",
//     description: "The React Framework for the Web",
//     url: "https://nextjs.org",
//     siteName: "Next.js",
//     images: [
//       {
//         url: "https://nextjs.org/og.png",
//         width: 800,
//         height: 600,
//       },
//       {
//         url: "https://nextjs.org/og-alt.png",
//         width: 1800,
//         height: 1600,
//         alt: "My custom alt",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

export default async function CanadaPost({ params: { slug } }: Props) {
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
  const imageWithURL = urlFor(blogPost.mainImage, client);
  return (
    <div className="container flex flex-col justify-center py-16 antialiased z-20 items-start lg:max-w-lg gap-5 px-6 lg:px-0">
      <div className="flex flex-row justify-center">
        <NextImage
          className="rounded-[50%]"
          placeholder="blur"
          blurDataURL={AUTHOR_IMAGE.blurDataURL}
          src={AUTHOR_IMAGE.src}
          height={50}
          width={50}
          alt={`${blogPost.title} - ${blogPost.authorName}`}
        />
        <div className="flex flex-col px-4 items-start justify-center">
          <span className="font-bold">{blogPost.authorName}</span>
          <span className="text-slate-400">
            {moment(blogPost._createdAt).format("MMMM Do YYYY")}
          </span>
        </div>
      </div>
      <h1 className="text-5xl font-bold py-3">{blogPost.title}</h1>
      <NextImage
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
