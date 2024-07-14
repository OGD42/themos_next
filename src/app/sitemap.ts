import { MetadataRoute } from "next";
import groq from "groq";
import { client } from "@root/sanity/lib/client";

type BlogType = {
  title: string;
  slug: { current: string };
  authorName: string;
};

const BASE_URL = "https://themos.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postEnglish = await client.fetch(groq`
      *[_type == "post" && language == "en"] | order(publishedAt desc) {
        title,
        slug,
        "authorName": author -> name,
      }
    `);

  const englishMaps = postEnglish.map((item: BlogType) => ({
    url: `${BASE_URL}/en/blog/canada/${item.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  const postSpanish = await client.fetch(groq`
      *[_type == "post" && language == "es"] | order(publishedAt desc) {
        title,
        slug,
        mainImage,
        "authorName": author -> name,
      }
    `);
  const spanishMaps = postSpanish.map((item: BlogType) => ({
    url: `${BASE_URL}/es/blog/canada/${item.slug.current}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://themos.ai/es",
          de: "https://themos.ai/en",
        },
      },
    },
    {
      url: "https://themos.ai/blog/canada",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://themos.ai/es/blog/canada",
          de: "https://themos.ai/en/blog/canada",
        },
      },
    },
    ...englishMaps,
    ...spanishMaps,
    {
      url: "https://themos.ai/blog/mexico",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://themos.ai/es/blog/mexico",
          de: "https://themos.ai/en/blog/mexico",
        },
      },
    },
    {
      url: "https://themos.ai/blog/spain",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://themos.ai/es/blog/spain",
          de: "https://themos.ai/en/blog/spain",
        },
      },
    },
    {
      url: "https://themos.ai/blog/usa",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://themos.ai/es/blog/usa",
          de: "https://themos.ai/en/blog/usa",
        },
      },
    },
  ];
}
