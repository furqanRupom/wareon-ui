"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct, updateProduct } from "@/services/product/productManagent";
import { IProducts } from "@/types/product.interface";
import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import InputFieldError from "@/components/shared/inputFieldError";

interface IProductFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    product?: IProducts;
    categories: Array<{ _id: string; name: string; slug: string; }>;
}

const ProductFormDialog = ({
    open,
    onClose,
    onSuccess,
    product,
    categories = [],
}: IProductFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!product?._id;

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateProduct.bind(null, product?._id as string) : createProduct,
        null
    );

    const [imageUrls, setImageUrls] = useState<string[]>(product?.productUrl || []);
    const [newImageUrl, setNewImageUrl] = useState("");
    const prevStateRef = useRef(state);

    const addImageUrl = () => {
        if (newImageUrl && newImageUrl.trim()) {
            // Validate URL format
            try {
                new URL(newImageUrl.trim());
                if (imageUrls.length >= 5) {
                    toast.error("Maximum 5 images allowed");
                    return;
                }
                setImageUrls([...imageUrls, newImageUrl.trim()]);
                setNewImageUrl("");
            } catch {
                toast.error("Please enter a valid URL");
            }
        }
    };

    const removeImageUrl = (index: number) => {
        setImageUrls(imageUrls.filter((_, i) => i !== index));
    };

    const updateImageUrl = (index: number, newUrl: string) => {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = newUrl;
        setImageUrls(updatedUrls);
    };

    // Handle success/error from server
    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Operation successful");
            if (formRef.current) {
                formRef.current.reset();
            }
            setImageUrls([]);
            setNewImageUrl("");
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    const handleClose = () => {
        setImageUrls([]);
        setNewImageUrl("");
        formRef.current?.reset();
        onClose();
    };

    // Handle form submit with image data
    const handleSubmit = async (formData: FormData) => {
        // Append image URLs
        imageUrls.forEach(url => {
            formData.append("productUrl", url);
        });

        formAction(formData);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-3xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Basic Information */}
                        <Field>
                            <FieldLabel htmlFor="name">Product Name *</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter product name"
                                defaultValue={state?.formData?.name || product?.name || ""}
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="category">Category *</FieldLabel>
                            <select
                                id="category"
                                name="category"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                defaultValue={state?.formData?.category || product?.category?._id || product?.category || ""}
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputFieldError field="category" state={state} />
                        </Field>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="price">Price *</FieldLabel>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    defaultValue={state?.formData?.price || product?.price || ""}
                                />
                                <InputFieldError field="price" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="stock">Stock</FieldLabel>
                                <Input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    placeholder="0"
                                    defaultValue={state?.formData?.stock || product?.stock || ""}
                                />
                                <InputFieldError field="stock" state={state} />
                            </Field>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="sku">SKU</FieldLabel>
                                <Input
                                    id="sku"
                                    name="sku"
                                    placeholder="Product SKU"
                                    defaultValue={state?.formData?.sku || product?.sku || ""}
                                />
                                <InputFieldError field="sku" state={state} />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="minStockThreshold">Min Stock Threshold</FieldLabel>
                                <Input
                                    id="minStockThreshold"
                                    name="minStockThreshold"
                                    type="number"
                                    placeholder="10"
                                    defaultValue={state?.formData?.minStockThreshold || product?.minStockThreshold || ""}
                                />
                                <InputFieldError field="minStockThreshold" state={state} />
                            </Field>
                        </div>

                        <Field>
                            <FieldLabel htmlFor="status">Status</FieldLabel>
                            <select
                                id="status"
                                name="status"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                defaultValue={state?.formData?.status || product?.status || "active"}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <InputFieldError field="status" state={state} />
                        </Field>

                        {/* Product Images Section - URL based only */}
                        <div className="space-y-3">
                            <Label>Product Images URLs (Max 5)</Label>

                            {/* Existing Image URLs List */}
                            {imageUrls.length > 0 && (
                                <div className="space-y-3">
                                    {imageUrls.map((url, index) => (
                                        <div key={`url-${index}`} className="space-y-2">
                                            <div className="relative group">
                                                <div className="flex gap-2 items-start">
                                                    <div className="flex-1">
                                                        <Input
                                                            value={url}
                                                            onChange={(e) => updateImageUrl(index, e.target.value)}
                                                            placeholder={`Image URL ${index + 1}`}
                                                            className="pr-10"
                                                        />
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImageUrl(index)}
                                                        className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                {url && (
                                                    <div className="mt-2 relative aspect-video rounded-md overflow-hidden border bg-gray-50">
                                                        <Image
                                                            src={url}
                                                            alt={`Product image ${index + 1}`}
                                                            fill
                                                            className="object-contain"
                                                            onError={(e) => {
                                                                const target = e.target as HTMLImageElement;
                                                                target.style.display = 'none';
                                                                const parent = target.parentElement;
                                                                if (parent) {
                                                                    const errorDiv = document.createElement('div');
                                                                    errorDiv.className = 'flex items-center justify-center h-full text-red-500 text-sm';
                                                                    errorDiv.textContent = 'Failed to load image';
                                                                    parent.appendChild(errorDiv);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add New Image URL Input */}
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImageUrl())}
                                />
                                <Button
                                    type="button"
                                    onClick={addImageUrl}
                                    variant="outline"
                                    disabled={imageUrls.length >= 5}
                                >
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add
                                </Button>
                            </div>

                            {imageUrls.length >= 5 && (
                                <p className="text-xs text-yellow-600">
                                    Maximum 5 images reached. Remove some to add more.
                                </p>
                            )}

                            <p className="text-xs text-muted-foreground">
                                {imageUrls.length}/5 images added
                            </p>
                            <InputFieldError field="productUrl" state={state} />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending
                                ? "Saving..."
                                : isEdit
                                    ? "Update Product"
                                    : "Create Product"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProductFormDialog;