"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Star, Users, Award } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Static brands data
const brands = [
    {
        id: 1,
        name: "Nike",
        logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=400&fit=crop",
        description: "Leading sportswear brand known for innovation, performance, and iconic designs.",
        founded: 1964,
        headquarters: "Beaverton, Oregon, USA",
        products: 450,
        rating: 4.8,
        featured: true,
        categories: ["Footwear", "Sportswear", "Accessories"],
    },
    {
        id: 2,
        name: "Adidas",
        logo: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=1200&h=400&fit=crop",
        description: "Global sportswear manufacturer focusing on quality, style, and sustainability.",
        founded: 1949,
        headquarters: "Herzogenaurach, Germany",
        products: 520,
        rating: 4.7,
        featured: true,
        categories: ["Footwear", "Sportswear", "Training Gear"],
    },
    {
        id: 3,
        name: "Zara",
        logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
        description: "Fast-fashion retailer offering trendy clothing for men, women, and children.",
        founded: 1974,
        headquarters: "Arteixo, Spain",
        products: 1200,
        rating: 4.6,
        featured: true,
        categories: ["Women's Wear", "Men's Wear", "Kids' Wear"],
    },
    {
        id: 4,
        name: "H&M",
        logo: "https://images.unsplash.com/photo-1534293230397-86e8b5b2e2e2?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1534293230397-86e8b5b2e2e2?w=1200&h=400&fit=crop",
        description: "Affordable fashion and quality clothing for the whole family.",
        founded: 1947,
        headquarters: "Stockholm, Sweden",
        products: 980,
        rating: 4.5,
        featured: false,
        categories: ["Women's Wear", "Men's Wear", "Accessories"],
    },
    {
        id: 5,
        name: "Gucci",
        logo: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=400&fit=crop",
        description: "Italian luxury fashion house known for high-end accessories and clothing.",
        founded: 1921,
        headquarters: "Florence, Italy",
        products: 280,
        rating: 4.9,
        featured: true,
        categories: ["Luxury Wear", "Accessories", "Bags"],
    },
    {
        id: 6,
        name: "Levi's",
        logo: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&h=400&fit=crop",
        description: "Iconic denim brand known for quality jeans and casual wear.",
        founded: 1853,
        headquarters: "San Francisco, California, USA",
        products: 380,
        rating: 4.7,
        featured: false,
        categories: ["Denim", "Casual Wear", "Jackets"],
    },
    {
        id: 7,
        name: "Puma",
        logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=400&fit=crop",
        description: "German multinational company that designs and manufactures athletic footwear and apparel.",
        founded: 1948,
        headquarters: "Herzogenaurach, Germany",
        products: 410,
        rating: 4.6,
        featured: false,
        categories: ["Footwear", "Sportswear", "Accessories"],
    },
    {
        id: 8,
        name: "Louis Vuitton",
        logo: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&h=400&fit=crop",
        description: "French luxury fashion house and company known for premium leather goods.",
        founded: 1854,
        headquarters: "Paris, France",
        products: 320,
        rating: 4.9,
        featured: true,
        categories: ["Luxury Wear", "Bags", "Accessories"],
    },
    {
        id: 9,
        name: "Uniqlo",
        logo: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=400&fit=crop",
        description: "Japanese casual wear designer and retailer known for high-quality basics.",
        founded: 1949,
        headquarters: "Yamaguchi, Japan",
        products: 680,
        rating: 4.6,
        featured: false,
        categories: ["Basics", "Casual Wear", "Activewear"],
    },
    {
        id: 10,
        name: "Ralph Lauren",
        logo: "https://images.unsplash.com/photo-1534293230397-86e8b5b2e2e2?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1534293230397-86e8b5b2e2e2?w=1200&h=400&fit=crop",
        description: "American fashion company known for classic and sophisticated designs.",
        founded: 1967,
        headquarters: "New York City, USA",
        products: 450,
        rating: 4.7,
        featured: false,
        categories: ["Men's Wear", "Women's Wear", "Accessories"],
    },
    {
        id: 11,
        name: "Under Armour",
        logo: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=400&fit=crop",
        description: "American sports clothing and accessories company focused on performance wear.",
        founded: 1996,
        headquarters: "Baltimore, Maryland, USA",
        products: 390,
        rating: 4.5,
        featured: false,
        categories: ["Activewear", "Sportswear", "Footwear"],
    },
    {
        id: 12,
        name: "Forever 21",
        logo: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop",
        coverImage: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=400&fit=crop",
        description: "Fast-fashion retailer offering trendy and affordable clothing.",
        founded: 1984,
        headquarters: "Los Angeles, California, USA",
        products: 1500,
        rating: 4.3,
        featured: false,
        categories: ["Women's Wear", "Men's Wear", "Accessories"],
    },
];

// Featured brands
const featuredBrands = brands.filter(brand => brand.featured).slice(0, 4);

export default function BrandsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <div className="relative bg-linear-to-r from-primary/10 via-primary/5 to-transparent py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                            Our Brands
                        </h1>
                        <p className="text-lg text-muted-foreground mb-6">
                            Discover the world's most renowned fashion and lifestyle brands at WAREON.
                            From luxury to streetwear, find your perfect style.
                        </p>
                        <div className="flex gap-4">
                            <Button size="lg" className="rounded-full">
                                Explore All Brands
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Brands</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="text-center p-6 bg-card rounded-2xl border border-border/50">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <ShoppingBag className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">{brands.length}+</p>
                        <p className="text-sm text-muted-foreground">Premium Brands</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-2xl border border-border/50">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Star className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">4.7</p>
                        <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-2xl border border-border/50">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">30K+</p>
                        <p className="text-sm text-muted-foreground">Happy Customers</p>
                    </div>
                    <div className="text-center p-6 bg-card rounded-2xl border border-border/50">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Award className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">15+</p>
                        <p className="text-sm text-muted-foreground">Years Experience</p>
                    </div>
                </div>

                {/* Featured Brands Section */}
                <div className="mb-16">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                            Featured Brands
                        </h2>
                        <Link href="#">
                            <Button variant="link" className="text-primary">
                                View All
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredBrands.map((brand) => (
                            <Link key={brand.id} href={`/brands/${brand.name.toLowerCase()}`}>
                                <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={brand.coverImage}
                                            alt={brand.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <div className="flex items-center gap-1 bg-white/90 rounded-full px-2 py-1">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                <span className="text-xs font-semibold">{brand.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white">
                                                <Image
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground text-lg">
                                                    {brand.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    Founded {brand.founded}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                            {brand.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {brand.categories.slice(0, 2).map((category) => (
                                                <span
                                                    key={category}
                                                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                            {brand.categories.length > 2 && (
                                                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                                                    +{brand.categories.length - 2}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* All Brands Section */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                        All Brands
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {brands.map((brand) => (
                            <Link key={brand.id} href={`/brands/${brand.name.toLowerCase()}`}>
                                <div className="group bg-card rounded-xl border border-border/50 hover:shadow-lg transition-all duration-300 p-6">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white border border-border/50">
                                            <Image
                                                src={brand.logo}
                                                alt={brand.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground text-lg">
                                                {brand.name}
                                            </h3>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                                <span className="text-sm font-medium">{brand.rating}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    ({brand.products} products)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {brand.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-muted-foreground">
                                            Founded {brand.founded}
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-primary group-hover:translate-x-1 transition-transform"
                                        >
                                            Shop Now
                                            <ArrowRight className="ml-1 h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}