// components/product-card.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

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
    // const { toast } = useToast();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        setIsAdding(true);

        // Simulate API call
        setTimeout(() => {
            // toast({
            //     title: "Added to cart",
            //     description: `${product.name} has been added to your cart.`,
            // });
            setIsAdding(false);
        }, 500);
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
                        onClick={(e) => {
                            e.preventDefault();
                            // toast({
                            //     title: "Added to wishlist",
                            //     description: `${product.name} has been added to your wishlist.`,
                            // });
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors"
                    >
                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
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
                            ${product.price}
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

                    {product.stock === 0 && (
                        <p className="text-xs text-red-500 mt-2">Out of stock</p>
                    )}
                </div>
            </div>
        </Link>
    );
}