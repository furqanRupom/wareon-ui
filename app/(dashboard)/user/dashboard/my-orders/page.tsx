// app/my-orders/page.tsx
import TablePagination from "@/components/shared/tablePagination";
import { TableSkeleton } from "@/components/shared/tableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getOrdersByUser } from "@/services/order/oderManagement";
import { Metadata } from "next";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import MyOrderTable from "@/components/modules/order/user/myOrderTables";

export const metadata: Metadata = {
    title: "My Orders - Wareon",
    description: "View and manage your orders",
};

const MyOrdersPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const orderResult = await getOrdersByUser(queryString);
    const totalPages = Math.ceil(
        (orderResult?.meta?.total || 1) / (orderResult?.meta?.limit || 1)
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Package className="h-6 w-6 text-primary" />
                        <div>
                            <CardTitle className="text-2xl">My Orders</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                                Track and manage your orders
                            </p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<TableSkeleton columns={5} rows={5} />}>
                        <MyOrderTable orders={orderResult?.data || []} />
                        <TablePagination
                            currentPage={orderResult?.meta?.page || 1}
                            totalPages={totalPages || 1}
                        />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyOrdersPage;