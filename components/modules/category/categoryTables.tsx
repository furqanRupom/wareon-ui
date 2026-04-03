"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ManagementTable from "@/components/shared/managementTable";
import { categoryColumns } from "./categoryColumns";
import DeleteConfirmationDialog from "@/components/shared/deleteConfirmationDialog";
import CategoryManagementDialog from "./categoryManagementDialog";
import { ICategory } from "@/types/product.interface";
import { deleteCategory } from "@/services/category/categoryManagement";
import CategoryViewDetailDialog from "./categoryViewDetails";

interface CategoryTableProps {
    categories: ICategory[];
}

const CategoryTable = ({ categories }: CategoryTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingCategory, setDeletingCategory] = useState<ICategory | null>(null);
    const [viewingCategory, setViewingCategory] = useState<ICategory | null>(null);
    const [editingCategory, setEditingCategory] = useState<ICategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (category: ICategory) => {
        setViewingCategory(category);
    };

    const handleEdit = (category: ICategory) => {
        setEditingCategory(category);
    };

    const handleDelete = (category: ICategory) => {
        setDeletingCategory(category);
    };

    const confirmDelete = async () => {
        if (!deletingCategory) return;

        setIsDeleting(true);
        const result = await deleteCategory(deletingCategory._id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Category deleted successfully");
            setDeletingCategory(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete category");
        }
    };

    return (
        <>
            <ManagementTable
                data={categories}
                columns={categoryColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(category) => category._id!}
                emptyMessage="No categories found"
            />

            {/* Edit Category Form Dialog */}
            <CategoryManagementDialog
                open={!!editingCategory}
                onClose={() => setEditingCategory(null)}
                category={editingCategory!}
                onSuccess={() => {
                    setEditingCategory(null);
                    handleRefresh();
                }}
            />

            {/* View Category Detail Dialog */}
            <CategoryViewDetailDialog
                open={!!viewingCategory}
                onClose={() => setViewingCategory(null)}
                category={viewingCategory}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingCategory}
                onOpenChange={(open) => !open && setDeletingCategory(null)}
                onConfirm={confirmDelete}
                title="Delete Category"
                description={`Are you sure you want to delete "${deletingCategory?.name}"? This action cannot be undone. Products in this category may be affected.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default CategoryTable;