"use client";

import { DateCell } from "@/components/shared/cell/dateCell";
import { StatusBadgeBoolCell } from "@/components/shared/cell/statusBadgeBoolCell";
import { Column } from "@/components/shared/managementTable";
import { ICategory } from "@/types/product.interface";

export const categoryColumns: Column<ICategory>[] = [
    {
        header: "Category",
        accessor: (category) => (
            <div className="flex items-center gap-3">

                <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">Slug: {category.slug || "N/A"}</span>
                </div>
            </div>
        ),
        sortKey: "name",
    },

    {
        header: "Status",
        accessor: (category) => <StatusBadgeBoolCell isActive={category.isActive} />,
        sortKey: "status",
    },
    {
        header: "Created",
        accessor: (category) => <DateCell date={category.createdAt} />,
        sortKey: "createdAt",
    },
];