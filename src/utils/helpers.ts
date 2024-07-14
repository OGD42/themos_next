import imageUrlBuilder from "@sanity/image-url";
import { SanityClient } from "sanity";

export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/en/"
    : "https://www.themos.ai/";

export function urlFor(
  source: { _ref: string; _type: string },
  client: SanityClient
) {
  return imageUrlBuilder(client).image(source);
}
