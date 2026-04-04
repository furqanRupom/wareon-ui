"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementPageHeader from "@/components/shared/managementPageHeader";

const OrderManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <ManagementPageHeader
            title="Order Management"
            description="Manage customer orders, update status, and track deliveries"
        />
    );
};

export default OrderManagementHeader;