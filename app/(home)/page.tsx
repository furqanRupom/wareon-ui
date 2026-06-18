import BrowseByCategory from "@/components/home/browse-by-category";
import CustomerReviews from "@/components/home/customer-reviews";
import DiscountBanner from "@/components/home/discount-banner";
import HeroSection from "@/components/home/Hero"
import NewArrivals from "@/components/home/new-arrivals";
import TopSelling from "@/components/home/top-seling";
import { TrustSection } from "@/components/home/trust";
import { getProducts } from "@/services/product/productManagent";
import { Metadata } from "next"

export const metadata:Metadata = {
  title: "Wareon",
  description: "A E-commerce platform for your best shopping experience",
}






export default async function Page() {
  const products = await getProducts("")
  return (
    <div >
      <HeroSection />
      <TrustSection />
      <BrowseByCategory />
      <DiscountBanner />
      <NewArrivals products={products?.data || []}  />
      <CustomerReviews />
    </div>
  )
}
