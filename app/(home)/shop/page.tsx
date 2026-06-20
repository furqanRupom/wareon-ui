import { Suspense } from "react";
import Shop from "@/components/shop/shop";
import { queryStringFormatter } from "@/lib/formatters";
import { getProducts } from "@/services/product/productManagent";
import { getCategories } from "@/services/category/categoryManagement"; // assumes this exists
import { ShopSkeleton } from "@/components/shop/shopSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop - Wareon",
    description: "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
};

const MAX_PRICE = 10000;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const [productsResult, categoriesResult] = await Promise.all([
        getProducts(queryString),
        getCategories(),
    ]);

    const initialPage = Number(searchParamsObj.page) || 1;
    const initialSearch = String(searchParamsObj.search ?? "");
    const initialCategories = searchParamsObj.category
        ? String(searchParamsObj.category).split(",").filter(Boolean)
        : [];
    const initialMinPrice = Number(searchParamsObj.minPrice) || 0;
    const initialMaxPrice = Number(searchParamsObj.maxPrice) || MAX_PRICE;
    const initialSort = String(searchParamsObj.sort ?? "newest");
    const initialInStock = searchParamsObj.inStock === "true";

    return (
        <Suspense fallback={<ShopSkeleton />}>
            <Shop
                initialData={productsResult}
                categories={categoriesResult?.success ? categoriesResult.data : []}
                initialPage={initialPage}
                initialSearch={initialSearch}
                initialCategories={initialCategories}
                initialMinPrice={initialMinPrice}
                initialMaxPrice={initialMaxPrice}
                initialSort={initialSort}
                initialInStock={initialInStock}
            />
        </Suspense>
    );
}
