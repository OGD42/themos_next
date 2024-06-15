export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/en/"
    : "https://www.themos.ai/";
