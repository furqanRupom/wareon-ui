"use client";

import { DateCell } from "@/components/shared/cell/dateCell";
import { PriceCell } from "@/components/shared/cell/priceCell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgeCell";
import { StockCell } from "@/components/shared/cell/stockCell";
import { Column } from "@/components/shared/managementTable";
import {  IProducts } from "@/types/product.interface";
import Image from "next/image";

export const productColumns: Column<IProducts>[] = [
    {
        header: "Product",
        accessor: (product) => (
            <div className="flex items-center gap-3">
                {product.productUrl && product.productUrl.length > 0 ? (
                    <div className="relative h-12 w-12 shrink-0 rounded-md overflow-hidden bg-gray-100">
                        <Image
                            src={product.productUrl[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-12 w-12 shrink-0 rounded-md bg-gray-100 flex items-center justify-center">
                        <span className="text-xs text-gray-400">No img</span>
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="font-medium text-sm">{product.name}</span>
                    <span className="text-xs text-muted-foreground">SKU: {product.sku || "N/A"}</span>
                </div>
            </div>
        ),
        sortKey: "name",
    },
    {
        header: "Category",
        accessor: (product) => (
            <div className="flex flex-col">
                <span className="text-sm">{product.category?.name || "Uncategorized"}</span>
            </div>
        ),
        sortKey: "category",
    },
    {
        header: "Price",
        accessor: (product) => <PriceCell price={product.price || 0} />,
        sortKey: "price",
    },
    {
        header: "Stock",
        accessor: (product) => (
            <StockCell
                stock={product.stock || 0}
                minThreshold={product.minStockThreshold}
            />
        ),
        sortKey: "stock",
    },
    {
        header: "Status",
        accessor: (product) => <StatusBadgeCell status={product.status} />,
        sortKey: "status",
    },
    {
        header: "Created",
        accessor: (product) => <DateCell date={product.createdAt} />,
        sortKey: "createdAt",
    },
];