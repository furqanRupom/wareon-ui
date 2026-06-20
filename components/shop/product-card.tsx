"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, ImageOff } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    productUrl: string[];
    category: {
        _id: string;
        name: string;
        slug: string;
    };
}

interface ProductCardProps {
    product: Product;
}

const LOW_STOCK_THRESHOLD = 15;

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const outOfStock = product.stock === 0;
    const lowStock = !outOfStock && product.stock <= LOW_STOCK_THRESHOLD;

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (outOfStock || isAdding) return;

        setIsAdding(true);
        try {
            const existingCart = localStorage.getItem("cart");
            let cartItems = existingCart ? JSON.parse(existingCart) : [];

            const existingIndex = cartItems.findIndex(
                (item: any) => item.productId === product._id
            );

            if (existingIndex !== -1) {
                const newQuantity = cartItems[existingIndex].quantity + 1;
                if (newQuantity > product.stock) {
                    toast.error(
                        `Only ${product.stock} items in stock. You already have ${cartItems[existingIndex].quantity} in your cart.`
                    );
                    return;
                }
                cartItems[existingIndex].quantity = newQuantity;
            } else {
                cartItems.push({
                    productId: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.productUrl[0],
                    stock: product.stock,
                    category: product.category.name,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cartItems));
            window.dispatchEvent(new Event("cartUpdated"));

            toast.success(`${product.name} added to cart!`);
        } finally {
            setIsAdding(false);
        }
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsWishlisted((prev) => !prev);
        toast.success(
            isWishlisted
                ? `${product.name} removed from wishlist!`
                : `${product.name} added to wishlist!`
        );
    };

    return (
        <Link href={`/shop/${product._id}`}>
            <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-border hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="aspect-square relative overflow-hidden bg-muted">
                    {product.productUrl?.[0] ? (
                        <Image
                            src={product.productUrl[0]}
                            alt={product.name}
                            fill
                            className={cn(
                                "object-cover group-hover:scale-105 transition-transform duration-500",
                                outOfStock && "opacity-60"
                            )}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ImageOff className="h-8 w-8 text-muted-foreground/40" />
                        </div>
                    )}

                    {/* Stock badge */}
                    {outOfStock ? (
                        <span className="absolute top-2.5 left-2.5 bg-background text-muted-foreground text-[11px] font-medium px-2.5 py-1 rounded-md border border-border/50">
                            Out of stock
                        </span>
                    ) : lowStock ? (
                        <span className="absolute top-2.5 left-2.5 bg-amber-500/15 text-amber-700 dark:text-amber-400 text-[11px] font-medium px-2.5 py-1 rounded-md">
                            {product.stock} left
                        </span>
                    ) : null}

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlist}
                        className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-background/90 border border-border/50 hover:bg-background flex items-center justify-center transition-colors"
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart
                            className={cn(
                                "h-4 w-4 transition-colors",
                                isWishlisted
                                    ? "text-red-500 fill-red-500"
                                    : "text-muted-foreground"
                            )}
                        />
                    </button>
                </div>

                <div className="p-3.5">
                    <p className="text-xs text-muted-foreground mb-0.5 truncate">
                        {product.category.name}
                    </p>
                    <h3 className="font-medium text-foreground text-sm mb-2.5 line-clamp-1">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                        <p className="text-lg font-semibold text-foreground">
                            ${product.price.toLocaleString()}
                        </p>
                        <button
                            onClick={handleAddToCart}
                            disabled={isAdding || outOfStock}
                            aria-label="Add to cart"
                            className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0",
                                outOfStock
                                    ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                            )}
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
