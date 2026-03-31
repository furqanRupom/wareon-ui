// shop/[id]/page.tsx

import ProductDetailPage from "@/components/shop/product-details";

export const metadata = {
    title: "Shop - Wareon",
    description:
        "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
};

export default function Page({ params }: { params: { id: string } }) {
    return <ProductDetailPage id={params.id} />;
}