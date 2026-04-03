"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import CategoryManagementDialog from "./categoryManagementDialog";
import ManagementPageHeader from "@/components/shared/managementPageHeader";
import { ICategory } from "@/types/product.interface";

interface CategoryManagementHeaderProps {
    categories?: ICategory[];
}

const CategoryManagementHeader = ({ categories }: CategoryManagementHeaderProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    // Force remount to reset state of form
    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <CategoryManagementDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Category Management"
                description="Manage product categories"
                action={{
                    label: "Add Category",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </>
    );
};

export default CategoryManagementHeader;