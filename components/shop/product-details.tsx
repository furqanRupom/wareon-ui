"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Minus, Plus, Check } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, useSearchParams } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";

// Mock Products Data
const mockProducts = [
    {
        _id: "1",
        name: "Chic Transparent Fashion Handbag",
        price: 61,
        stock: 50,
        productUrl: ["https://i.imgur.com/Lqaqz59.jpg", "https://i.imgur.com/uSqWK0m.jpg", "https://i.imgur.com/atWACf1.jpg"],
        category: {
            _id: "cat1",
            name: "Miscellaneous",
            slug: "miscellaneous",
        },
        status: "ACTIVE",
        sku: "CHIC-TRANSPARENT-001",
        description: "A stylish transparent handbag that adds a modern touch to any outfit. Perfect for casual and formal occasions."
    },
    {
        _id: "2",
        name: "Premium Cotton Shirt",
        price: 49,
        stock: 35,
        productUrl: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "PREMIUM-COTTON-001",
        description: "High-quality cotton shirt with premium fabric for ultimate comfort and style."
    },
    {
        _id: "3",
        name: "Classic Crew Neck T-Shirt",
        price: 29,
        stock: 100,
        productUrl: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "CLASSIC-CREW-001",
        description: "Essential crew neck t-shirt made from soft, breathable cotton. Perfect for everyday wear."
    },
    {
        _id: "4",
        name: "Urban Bomber Jacket",
        price: 89,
        stock: 20,
        productUrl: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "URBAN-BOMBER-001",
        description: "Stylish bomber jacket with urban design. Features comfortable fit and durable material."
    },
    {
        _id: "5",
        name: "Elegant Evening Dress",
        price: 120,
        stock: 15,
        productUrl: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&h=600&fit=crop"],
        category: {
            _id: "cat3",
            name: "Women's Wear",
            slug: "womens-wear",
        },
        status: "ACTIVE",
        sku: "ELEGANT-DRESS-001",
        description: "Stunning evening dress perfect for special occasions. Made with high-quality fabric."
    },
    {
        _id: "6",
        name: "Casual Denim Jeans",
        price: 55,
        stock: 45,
        productUrl: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "CASUAL-DENIM-001",
        description: "Classic denim jeans with comfortable fit and durable material."
    },
    {
        _id: "7",
        name: "Leather Crossbody Bag",
        price: 75,
        stock: 30,
        productUrl: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop"],
        category: {
            _id: "cat4",
            name: "Accessories",
            slug: "accessories",
        },
        status: "ACTIVE",
        sku: "LEATHER-BAG-001",
        description: "Premium leather crossbody bag with multiple compartments. Perfect for daily use."
    },
    {
        _id: "8",
        name: "Running Sneakers",
        price: 85,
        stock: 40,
        productUrl: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"],
        category: {
            _id: "cat5",
            name: "Footwear",
            slug: "footwear",
        },
        status: "ACTIVE",
        sku: "RUNNING-SNEAKERS-001",
        description: "Comfortable running sneakers with excellent support and cushioning."
    },
];

export default function ProductDetailPage(params :{id: string}) {
    // const { toast } = useToast();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const foundProduct = mockProducts.find(p => p._id === params.id);
            setProduct(foundProduct || null);
            setLoading(false);
        }, 500);
    }, [params.id]);

    const handleAddToCart = async () => {
        if (!product) return;

        setIsAdding(true);
        // Simulate API call
        setTimeout(() => {
            // toast({
            //     title: "Added to cart",
            //     description: `${quantity} × ${product.name} added to your cart.`,
            // });
            // setIsAdding(false);
        }, 500);
    };

    const updateQuantity = (delta: number) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
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
                            <BreadcrumbLink href={`/shop/${product.category.slug}`}>
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
                                {product.productUrl.map((url: string, index: number) => (
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
                                ${product.price}
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
                                <h3 className="font-semibold text-foreground mb-2">
                                    Description
                                </h3>
                                <p className="text-muted-foreground">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Quantity Selector */}
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
                                        onClick={() => {
                                            // toast({
                                            //     title: "Added to wishlist",
                                            //     description: `${product.name} has been added to your wishlist.`,
                                            // });
                                        }}
                                    >
                                        <Heart className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Product Details */}
                        <div className="border-t border-border pt-6">
                            <h3 className="font-semibold text-foreground mb-3">
                                Product Details
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                SKU: {product.sku}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}