"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  ShoppingCart,
  Heart,
  Minus,
  Plus,
  Check,
  Truck,
  Star,
} from "lucide-react";

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
  };
  status: string;
  sku: string;
  description?: string;
}

export default function ProductDetailPage({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const updateQuantity = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= product.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    try {
      const existingCart = localStorage.getItem("cart");
      let cartItems = existingCart ? JSON.parse(existingCart) : [];

      const existingIndex = cartItems.findIndex(
        (item: any) => item.productId === product._id
      );

      const requestedQty = quantity;

      if (existingIndex !== -1) {
        const newQuantity =
          cartItems[existingIndex].quantity + requestedQty;

        if (newQuantity > product.stock) {
          toast.error(
            `Only ${product.stock} items in stock. You already have ${cartItems[existingIndex].quantity} in cart`
          );
          setIsAdding(false);
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product");
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted((prev) => !prev);
    toast.success(
      isWishlisted
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  };

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop">
          <Button className="mt-4">Go Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
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
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT: Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              <Image
                src={product.productUrl[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {product.productUrl.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${selectedImage === i
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                    }`}
                >
                  <Image
                    src={img}
                    alt="thumb"
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="space-y-6  lg:top-24 h-fit">

            {/* Title */}
            <div className="space-y-2">
              <Badge variant="secondary">
                {product.category.name}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold">
                {product.name}
              </h1>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.9</span>
                <span className="border-l pl-2">128 reviews</span>
              </div>
            </div>

            {/* Price */}
            <Card>
              <CardContent className="flex items-center gap-4 py-5">
                <span className="text-3xl font-bold text-primary">
                  ${product.price}
                </span>

                <span className="line-through text-muted-foreground">
                  ${(product.price * 1.1).toFixed(0)}
                </span>

                <Badge className="bg-green-100 text-green-700">
                  SAVE 10%
                </Badge>
              </CardContent>
            </Card>

            {/* Shipping */}
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/40">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-sm">
                Free shipping over $100
              </span>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="text-green-500 w-5 h-5" />
                  <span className="text-green-600">
                    In Stock ({product.stock})
                  </span>
                </>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </div>

            {/* Buy Section */}
            {product.stock > 0 && (
              <Card>
                <CardContent className="space-y-4 py-5">

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Quantity</span>

                    <div className="flex items-center border rounded-full">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(-1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <span className="w-10 text-center">
                        {quantity}
                      </span>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => updateQuantity(1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      className="flex-1 rounded-full cursor-pointer"
                      size="lg"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 w-5 h-5" />
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      onClick={handleWishlist}
                    >
                      <Heart
                        className={`w-5 h-5 ${isWishlisted
                            ? "fill-red-500 text-red-500"
                            : ""
                          }`}
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="details">
                <AccordionTrigger>
                  Product Details
                </AccordionTrigger>
                <AccordionContent>
                  {product.description || "No description"}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs">
                <AccordionTrigger>
                  Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">SKU: {product.sku}</p>
                  <p className="text-sm">
                    Status: {product.status}
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger>
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent>
                  Free shipping. 30-day returns.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
        </div>
      </div>
    </div>
  );
}
