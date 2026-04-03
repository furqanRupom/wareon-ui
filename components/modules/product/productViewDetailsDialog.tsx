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
import { IProducts } from "@/types/product.interface";
import { Calendar, DollarSign, Package, Tag, Layers, Archive, AlertTriangle, Image as ImageIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IProductViewDialogProps {
    open: boolean;
    onClose: () => void;
    product: IProducts | null;
}

const ProductViewDetailDialog = ({
    open,
    onClose,
    product,
}: IProductViewDialogProps) => {
    if (!product) {
        return null;
    }

    const getStockStatus = (stock: number, minThreshold?: number) => {
        if (stock === 0) return { label: "Out of Stock", variant: "destructive" as const, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" };
        if (minThreshold && stock <= minThreshold) return { label: "Low Stock", variant: "secondary" as const, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" };
        return { label: "In Stock", variant: "default" as const, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" };
    };

    const stockStatus = getStockStatus(product.stock || 0, product.minStockThreshold);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Product Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Product Images Gallery */}
                    {product.productUrl && product.productUrl.length > 0 && (
                        <div className="mb-6">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {product.productUrl.slice(0, 4).map((url, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-gray-50">
                                        <Image
                                            src={url}
                                            alt={`${product.name} - Image ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                        {index === 3 && product.productUrl.length > 4 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <span className="text-white font-medium">+{product.productUrl.length - 4}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Product Header */}
                    <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg mb-6">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                            <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant={product.status === "ACTIVE" ? "default" : "secondary"}>
                                    {product.status === "ACTIVE" ? "Active" : "Inactive"}
                                </Badge>
                                <Badge variant="outline" className={stockStatus.color}>
                                    {stockStatus.label}
                                </Badge>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-primary">
                                    ${(product.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                {product.price && product.price > 0 && (
                                    <span className="text-sm text-muted-foreground">USD</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-6">
                        {/* Basic Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Basic Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Product Name"
                                        value={product.name}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Layers className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Category"
                                        value={product.category?.name || "Uncategorized"}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Tag className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="SKU"
                                        value={product.sku || "Not specified"}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <DollarSign className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Price"
                                        value={`$${(product.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Stock Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Archive className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-lg">Stock Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Archive className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Current Stock"
                                        value={`${product.stock || 0} units`}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Min Stock Threshold"
                                        value={product.minStockThreshold ? `${product.minStockThreshold} units` : "Not set"}
                                    />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Product Images URLs */}
                        {product.productUrl && product.productUrl.length > 0 && (
                            <>
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <ImageIcon className="h-5 w-5 text-purple-600" />
                                        <h3 className="font-semibold text-lg">Product Images</h3>
                                    </div>
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <div className="space-y-2">
                                            {product.productUrl.map((url, index) => (
                                                <div key={index} className="flex items-center gap-2 text-sm">
                                                    <ImageIcon className="h-3 w-3 text-muted-foreground shrink-0" />
                                                    <Link
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline truncate flex-1"
                                                    >
                                                        {url}
                                                    </Link>
                                                    <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                            </>
                        )}

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
                                        value={formatDateTime(product.createdAt)}
                                    />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow
                                        label="Last Updated"
                                        value={formatDateTime(product.updatedAt)}
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

export default ProductViewDetailDialog;