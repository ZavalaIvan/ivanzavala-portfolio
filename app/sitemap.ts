import type { MetadataRoute } from "next"
import { pages, pageIds, siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  return pageIds.flatMap(id => (["es", "en"] as const).map(locale => ({
    url: siteUrl + pages[id].paths[locale],
    alternates: { languages: { es: siteUrl + pages[id].paths.es, en: siteUrl + pages[id].paths.en } },
  })))
}
