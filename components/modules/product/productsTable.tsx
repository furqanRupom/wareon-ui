"use client";


import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { IProducts } from "@/types/product.interface";
import ManagementTable from "@/components/shared/managementTable";
import { productColumns } from "./productColumns";
import ProductViewDetailDialog from "./productViewDetailsDialog";
import DeleteConfirmationDialog from "@/components/shared/deleteConfirmationDialog";
import ProductFormDialog from "./productFormDialog";
import { deleteProduct } from "@/services/product/productManagent";

interface ProductsTableProps {
    products: IProducts[];
}

const ProductsTable = ({ products }: ProductsTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingProduct, setDeletingProduct] = useState<IProducts | null>(null);
    const [viewingProduct, setViewingProduct] = useState<IProducts | null>(null);
    const [editingProduct, setEditingProduct] = useState<IProducts | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (product: IProducts) => {
        setViewingProduct(product);
    };

    const handleEdit = (product: IProducts) => {
        setEditingProduct(product);
    };

    const handleDelete = (product: IProducts) => {
        setDeletingProduct(product);
    };

    const confirmDelete = async () => {
        if (!deletingProduct) return;

        setIsDeleting(true);
        const result = await deleteProduct(deletingProduct._id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Product deleted successfully");
            setDeletingProduct(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete Product");
        }
    };

    return (
        <>
            <ManagementTable
                data={products}
                columns={productColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(Product) => Product._id!}
                emptyMessage="No Products found"
            />

            {/* Edit Product Form Dialog */}
            <ProductFormDialog
                open={!!editingProduct}
                onClose={() => setEditingProduct(null)}
                product={editingProduct!}
                categories={[]}
                onSuccess={() => {
                    setEditingProduct(null);
                    handleRefresh();
                }}
            />

            {/* View Product Detail Dialog */}
            <ProductViewDetailDialog
                open={!!viewingProduct}
                onClose={() => setViewingProduct(null)}
                product={viewingProduct}
            />

            {/* Delete Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingProduct}
                onOpenChange={(open) => !open && setDeletingProduct(null)}
                onConfirm={confirmDelete}
                title="Delete Product"
                description={`Are you sure you want to delete ${deletingProduct?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default ProductsTable;
