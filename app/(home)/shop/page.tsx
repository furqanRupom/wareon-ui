import { Suspense } from "react";
import Shop from "@/components/shop/shop";
import { queryStringFormatter } from "@/lib/formatters";
import { getProducts } from "@/services/product/productManagent";
import { ShopSkeleton } from "@/components/shop/shopSkeleton";

export const metadata = {
    title: "Shop - Wareon",
    description: "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
}
const MAX_PRICE = 10000;

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const productsResult = await getProducts(queryString); // object { data: Product[], total: number, meta: { page: number, limit: number }, success: boolean, message?: string }
    const initialPage = Number(searchParamsObj.page) || 1;
    const initialSearch = String(searchParamsObj.search ?? "");
    const initialCategories = searchParamsObj.category
        ? String(searchParamsObj.category).split(",").filter(Boolean)
        : [];
    const initialMinPrice = Number(searchParamsObj.minPrice) || 0;
    const initialMaxPrice = Number(searchParamsObj.maxPrice) || MAX_PRICE;
    return (
        <Suspense fallback={<ShopSkeleton />}>
            <Shop
                initialData={productsResult}
                categories={[]}
                initialPage={initialPage}
                initialSearch={initialSearch}
                initialCategories={initialCategories}
                initialMinPrice={initialMinPrice}
                initialMaxPrice={initialMaxPrice}
            />
        </Suspense>
    );
}