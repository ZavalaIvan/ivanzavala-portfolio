import type { ReactNode } from "react"
import type { Locale } from "@/lib/site"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export function SiteDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
