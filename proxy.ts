import { NextRequest, NextResponse } from "next/server"
import { browserLocale, isLocale, languageCookie } from "@/lib/language"

export function proxy(request: NextRequest) {
  const saved = request.cookies.get(languageCookie)?.value
  const locale = isLocale(saved) ? saved : browserLocale(request.headers.get("accept-language"))
  if (locale === "es") return NextResponse.next()

  const destination = request.nextUrl.clone()
  destination.pathname = "/en"
  const response = NextResponse.redirect(destination, 307)
  response.headers.set("Cache-Control", "private, no-store")
  response.headers.set("Vary", "Accept-Language, Cookie")
  return response
}

export const config = { matcher: ["/"] }
