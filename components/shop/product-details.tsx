"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Minus, Plus, Check, Loader2 } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
    status: string;
    sku: string;
    description?: string;
}

export default function ProductDetailPage({ id }: { id: string }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setNotFound(false);
            try {
                const res = await fetch(`/api/products/${id}`);
                const data = await res.json();
                if (data.success && data.data) {
                    setProduct(data.data);
                } else {
                    setNotFound(true);
                }
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAdding(true);

        try {
            const existingCart = localStorage.getItem("cart");
            let cartItems = existingCart ? JSON.parse(existingCart) : [];

            const existingIndex = cartItems.findIndex(
                (item: any) => item.productId === product._id
            );

            const requestedQty = quantity;

            if (existingIndex !== -1) {
                const newQuantity = cartItems[existingIndex].quantity + requestedQty;
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
                    quantity: requestedQty,
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

    const updateQuantity = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
            setQuantity(newQuantity);
        }
    };

    const handleWishlist = () => {
        setIsWishlisted((prev) => !prev);
        toast.success(isWishlisted ? `${product?.name} removed from wishlist!` : `${product?.name} added to wishlist!`);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-muted-foreground" />
            </div>
        );
    }

    if (notFound || !product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/shop?category=${product.category._id}`}>
                                {product.category.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Product Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted">
                            <Image
                                src={product.productUrl[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {product.productUrl.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.productUrl.map((url, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square relative rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                                ? "border-primary"
                                                : "border-transparent hover:border-primary/50"
                                            }`}
                                    >
                                        <Image
                                            src={url}
                                            alt={`${product.name} view ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-2">
                                {product.category.name}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-bold text-primary">
                                ${product.price.toLocaleString()}
                            </p>
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                            {product.stock > 0 ? (
                                <>
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span className="text-green-600 font-medium">
                                        In Stock ({product.stock} available)
                                    </span>
                                </>
                            ) : (
                                <span className="text-red-500 font-medium">Out of Stock</span>
                            )}
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="border-t border-border pt-4">
                                <h3 className="font-semibold text-foreground mb-2">Description</h3>
                                <p className="text-muted-foreground">{product.description}</p>
                            </div>
                        )}

                        {/* Quantity + Actions */}
                        {product.stock > 0 && (
                            <div className="space-y-3">
                                <p className="font-medium text-foreground">Quantity</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-border rounded-full">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => updateQuantity(-1)}
                                            disabled={quantity <= 1}
                                            className="rounded-full"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="w-12 text-center font-medium">
                                            {quantity}
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => updateQuantity(1)}
                                            disabled={quantity >= product.stock}
                                            className="rounded-full"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={isAdding}
                                        size="lg"
                                        className="flex-1 rounded-full"
                                    >
                                        <ShoppingCart className="h-5 w-5 mr-2" />
                                        {isAdding ? "Adding..." : "Add to Cart"}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full"
                                        onClick={handleWishlist}
                                        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                    >
                                        <Heart
                                            className={`h-5 w-5 transition-colors ${isWishlisted ? "text-red-500 fill-red-500" : ""
                                                }`}
                                        />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="border-t border-border pt-6">
                            <h3 className="font-semibold text-foreground mb-3">Product Details</h3>
                            <p className="text-muted-foreground text-sm">SKU: {product.sku}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}