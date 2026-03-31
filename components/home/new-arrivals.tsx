// components/sections/new-arrivals.tsx
"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
    _id: string;
    name: string;
    price: number;
    productUrl: string[];
    category: {
        name: string;
    };
}

interface NewArrivalsProps {
    products: Product[];
}

const sampleProducts: Product[] = [
    {
        _id: "1",
        name: "Chic Transparent Fashion Handbag",
        price: 61,
        productUrl: ["https://i.imgur.com/Lqaqz59.jpg"],
        category: { name: "Miscellaneous" }
    },
    // Add more products...
];

export default function NewArrivals() {
    return (
        <section className="w-full py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center md:text-left">
                        NEW ARRIVALS
                    </h2>
                    <Link href="/products">
                        <Button
                            variant="outline"
                            className="mt-4 md:mt-0 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                            View All
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sampleProducts.slice(0, 4).map((product) => (
                        <Link
                            key={product._id}
                            href={`/product/${product._id}`}
                            className="group"
                        >
                            <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300">
                                <div className="aspect-square relative overflow-hidden bg-muted">
                                    <Image
                                        src={product.productUrl[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        {product.category.name}
                                    </p>
                                    <p className="text-2xl font-bold text-primary">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}