import { NextRequest, NextResponse } from "next/server"
import { isLocale, languageCookie, languageCookieMaxAge } from "@/lib/language"
import { pageHref, pageIds, type PageId } from "@/lib/site"

export function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale")
  const page = request.nextUrl.searchParams.get("page") ?? "home"
  if (!isLocale(locale) || !pageIds.includes(page as PageId)) {
    return new NextResponse("Invalid language or page", { status: 400, headers: { "Cache-Control": "no-store" } })
  }

  const destination = request.nextUrl.clone()
  destination.pathname = pageHref(page as PageId, locale)
  destination.search = ""
  const response = NextResponse.redirect(destination, 303)
  response.cookies.set(languageCookie, locale, {
    maxAge: languageCookieMaxAge,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
  })
  response.headers.set("Cache-Control", "private, no-store")
  return response
}
