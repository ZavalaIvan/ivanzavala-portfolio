import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("engagement", "en")
export default function Page() {
  return <PortfolioPage id="engagement" locale="en" />
}
