import { PortfolioPage } from "@/components/portfolio-page"
import { pageMetadata } from "@/lib/site"

export const metadata = pageMetadata("bookingAgent", "en")
export default function Page() { return <PortfolioPage id="bookingAgent" locale="en" /> }
