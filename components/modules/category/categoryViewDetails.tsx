"use client";

import InfoRow from "@/components/shared/infoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { ICategory } from "@/types/product.interface";
import { Calendar, Tag, Layers, Hash, Info } from "lucide-react";

interface ICategoryViewDialogProps {
    open: boolean;
    onClose: () => void;
    category: ICategory | null;
}

const CategoryViewDetailDialog = ({
    open,
    onClose,
    category,
}: ICategoryViewDialogProps) => {
    if (!category) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Category Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Category Header */}
                    <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg mb-6">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2">{category.name}</h2>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    Category
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Hash className="h-4 w-4" />
                                <span>Slug: {category.slug}</span>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Basic Information</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Category Name"
                                        value={category.name}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Layers className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Slug"
                                        value={category.slug}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* System Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-orange-600" />
                                <h3 className="font-semibold text-lg">System Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Created On"
                                        value={formatDateTime(category.createdAt)}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Last Updated"
                                        value={formatDateTime(category.updatedAt)}
                                    />
                                </div>
                            </div>
                        </div>

                     
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryViewDetailDialog;