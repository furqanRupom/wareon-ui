
import ProductManagementHeader from "@/components/modules/product/productManagementHeader";
import ProductsTable from "@/components/modules/product/productsTable";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getProducts } from "@/services/product/productManagent";
import { Suspense } from "react";

const ProductManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const productResult = await getProducts(queryString);

    const totalPages = Math.ceil(
        (productResult?.meta?.total || 1) / (productResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <ProductManagementHeader />

            {/* Search, Filters */}
            {/* <ProductsFilter /> */}

            <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
                <ProductsTable products={productResult?.data || []} />
                <TablePagination
                    currentPage={productResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default ProductManagementPage;