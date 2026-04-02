"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

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

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (product.stock === 0) return;

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
                    toast.error(`Only ${product.stock} items in stock. You already have ${cartItems[existingIndex].quantity} in your cart.`);
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
        toast.success(isWishlisted ? `${product.name} removed from wishlist!` : `${product.name} added to wishlist!`);
    };

    return (
        <Link href={`/shop/${product._id}`}>
            <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="aspect-square relative overflow-hidden bg-muted">
                    <Image
                        src={product.productUrl[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />

                    {/* Wishlist Button */}
                    <button
                        onClick={handleWishlist}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        <Heart
                            className={`h-4 w-4 transition-colors ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"
                                }`}
                        />
                    </button>

                    {/* Out of stock overlay */}
                    {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full">
                                Out of Stock
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="mb-2">
                        <p className="text-xs text-muted-foreground mb-1">
                            {product.category.name}
                        </p>
                        <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
                            {product.name}
                        </h3>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-2xl font-bold text-primary">
                            ${product.price.toLocaleString()}
                        </p>
                        <Button
                            onClick={handleAddToCart}
                            disabled={isAdding || product.stock === 0}
                            size="sm"
                            className="rounded-full"
                        >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {isAdding ? "Adding..." : "Add to Cart"}
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
}