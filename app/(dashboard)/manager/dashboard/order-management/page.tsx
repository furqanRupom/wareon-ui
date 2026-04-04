// app/admin/orders/page.tsx

import OrderManagementHeader from "@/components/modules/order/manager/orderManagementHeader";
import OrderTable from "@/components/modules/order/manager/orderTables";
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getOrders } from "@/services/order/oderManagement";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Order Management - Wareon",
    description: "Manage customer orders",
};

const OrderManagementPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const orderResult = await getOrders(queryString);

    const totalPages = Math.ceil(
        (orderResult?.meta?.total || 1) / (orderResult?.meta?.limit || 1)
    );

    return (
        <div className="space-y-6">
            <OrderManagementHeader />

            <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
                <OrderTable orders={orderResult?.data || []} />
                <TablePagination
                    currentPage={orderResult?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </Suspense>
        </div>
    );
};

export default OrderManagementPage;