import { Suspense } from "react";
import Shop from "@/components/shop/shop";
import { queryStringFormatter } from "@/lib/formatters";
import { getProducts } from "@/services/product/productManagent";

export const metadata = {
    title: "Shop - Wareon",
    description: "Explore our wide range of products across various categories. Find the best deals and latest arrivals at Wareon.",
}


export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const productsResult = await getProducts(queryString); // object { data: Product[], total: number, meta: { page: number, limit: number }, success: boolean, message?: string }
    console.log(productsResult)
    return (
        <Suspense fallback={<div>Loading shop...</div>}>
            <Shop initialData={productsResult} categories={[]} />
        </Suspense>
    );
}