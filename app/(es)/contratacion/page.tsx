import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("engagement", "es")
export default function Page() {
  return <PortfolioPage id="engagement" locale="es" />
}
