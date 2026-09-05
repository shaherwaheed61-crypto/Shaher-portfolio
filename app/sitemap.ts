import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";

const siteUrl = "https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/profile", "/credentials", "/contact"];

  return [
    ...pages.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
