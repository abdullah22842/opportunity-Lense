import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", "/work", "/research", "/about", "/contact"];

  return paths.map((path) => ({
    url: `${siteConfig.url}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
