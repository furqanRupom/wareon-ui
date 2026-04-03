"use client";

import { Badge } from "@/components/ui/badge";


interface StatusBadgeBoolCellProps {
    isActive?: boolean;
}

export function StatusBadgeBoolCell({
    isActive,
}: StatusBadgeBoolCellProps) {


    return (
        <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? "Active" : "Inactive"}
        </Badge>
    );
}