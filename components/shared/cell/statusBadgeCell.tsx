"use client";

import { Badge } from "@/components/ui/badge";

type Status = "ACTIVE" | "INACTIVE";

interface StatusBadgeCellProps {
    status?: Status;
    isDeleted?: boolean;
}

export function StatusBadgeCell({
    status,
    isDeleted,
}: StatusBadgeCellProps) {
    const deleted = isDeleted ?? status === "INACTIVE";

    return (
        <Badge variant={deleted ? "destructive" : "default"}>
            {deleted ? "Inactive" : "Active"}
        </Badge>
    );
}