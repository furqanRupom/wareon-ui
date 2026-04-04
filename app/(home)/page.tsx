import BrowseByCategory from "@/components/home/browse-by-category";
import CustomerReviews from "@/components/home/customer-reviews";
import HeroSection from "@/components/home/Hero"
import NewArrivals from "@/components/home/new-arrivals";
import TopSelling from "@/components/home/top-seling";
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
      <NewArrivals products={products?.data || []}  />
      <BrowseByCategory />
      <CustomerReviews />
    </div>
  )
}
