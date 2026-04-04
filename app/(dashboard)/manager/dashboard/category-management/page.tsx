
import CategoryManagementHeader from "@/components/modules/category/categoryManagementHeader";
import CategoryTable from "@/components/modules/category/categoryTables";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getCategories } from "@/services/category/categoryManagement";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: "Category Management - Wareon",
    description: "Handle products categories"
}

const ProductManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const categoryResult = await getCategories(queryString);
    console.log(categoryResult)
    

    const totalPages = Math.ceil(
        (categoryResult?.meta?.total || 1) / (categoryResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <CategoryManagementHeader categories={categoryResult?.data || []} />

            {/* Search, Filters */}
            {/* <ProductsFilter /> */}

            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <CategoryTable categories={categoryResult?.data || []} />
                <TablePagination
                    currentPage={categoryResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default ProductManagementPage;