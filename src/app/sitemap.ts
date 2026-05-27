import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: new Date() },
    { url: `${site.url}/blog`, lastModified: new Date() },
    { url: `${site.url}/about`, lastModified: new Date() },
  ];

  const postEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}${post.url}`,
    lastModified: new Date(post.frontmatter.date),
  }));

  return [...staticEntries, ...postEntries];
}
