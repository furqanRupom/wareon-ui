// shop/[id]/page.tsx

import ProductDetailPage from "@/components/shop/product-details";
import { getProduct } from "@/services/product/productManagent";

export const metadata = {
    title: "Shop - Wareon",
    description:
        "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
};

export default async  function Page({ params }: { params: { shopId: string } }) {
     const {shopId} = await params
     const result = await getProduct(shopId)
    return <ProductDetailPage product={result.data || {}} />;
}