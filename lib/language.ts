import type { Locale, PageId } from "@/lib/site"

export const languageCookie = "portfolio_language"
export const languageCookieMaxAge = 60 * 60 * 24 * 365

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "es" || value === "en"
}

export function browserLocale(acceptLanguage: string | null): Locale {
  const preferences = (acceptLanguage ?? "").split(",").map((entry, index) => {
    const [tag, ...parameters] = entry.trim().split(";")
    const qualityParameter = parameters.find(parameter => parameter.trim().startsWith("q="))
    const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1
    return { tag: tag.toLowerCase(), quality, index }
  }).filter(({ tag, quality }) => /^[a-z]{2,8}(?:-[a-z0-9]{1,8})*$/.test(tag) && Number.isFinite(quality) && quality > 0 && quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index)

  // Keep Spanish available when the request provides no language preference,
  // including crawlers. Explicit language URLs always keep their own language.
  if (!preferences.length) return "es"
  return preferences[0].tag.split("-")[0] === "es" ? "es" : "en"
}

export function languageChoiceHref(page: PageId, locale: Locale): string {
  return `/choose-language?locale=${locale}&page=${page}`
}
