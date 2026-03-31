import { Suspense } from "react";
import Shop from "@/components/shop/shop";

export const metadata = {
    title: "Shop - Wareon",
    description: "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
}


export default function Page() {
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <Shop />
        </Suspense>
    );
}