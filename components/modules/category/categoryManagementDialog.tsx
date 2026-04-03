"use client";

import InputFieldError from "@/components/shared/inputFieldError";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory, updateCategory } from "@/services/category/categoryManagement";
import { ICategory } from "@/types/product.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";



interface ICategoryManagementDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category?: ICategory;
}

const CategoryManagementDialog = ({
    open,
    onClose,
    onSuccess,
    category,
}: ICategoryManagementDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!category?._id;

    const [state, formAction, isPending] = useActionState(
        isEdit ? updateCategory.bind(null, category?._id as string) : createCategory,
        null
    );

    const prevStateRef = useRef(state);

    // Handle success/error from server
    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || `Category ${isEdit ? 'updated' : 'created'} successfully`);
            if (formRef.current) {
                formRef.current.reset();
            }
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose, isEdit]);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 max-w-lg">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>{isEdit ? "Edit Category" : "Add New Category"}</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Category Name Field */}
                        <Field>
                            <FieldLabel htmlFor="name">Category Name *</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Enter category name"
                                defaultValue={state?.formData?.name || category?.name || ""}
                                autoFocus
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Display slug info in edit mode (read-only) */}
                        {isEdit && category?.slug && (
                            <div className="text-sm bg-gray-50 p-3 rounded-md">
                                <span className="font-medium text-gray-700">Slug:</span>{' '}
                                <span className="text-gray-600">{category.slug}</span>
                                <p className="text-xs text-gray-500 mt-1">
                                    Slug is auto-generated from the category name
                                </p>
                            </div>
                        )}
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
                                    ? "Update Category"
                                    : "Create Category"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryManagementDialog;