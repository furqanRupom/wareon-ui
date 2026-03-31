// components/sections/browse-by-category.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

interface Category {
    _id: string;
    name: string;
    slug: string;
    imageUrl?: string;
}



const sampleCategories: Category[] = [
  { _id: "1", name: "Women's Wear", slug: "womens-wear" },
  { _id: "2", name: "Men's Wear", slug: "mens-wear" },
  { _id: "3", name: "Accessories", slug: "accessories" },
  { _id: "4", name: "Footwear", slug: "footwear" },
  { _id: "5", name: "Bags", slug: "bags" },
];

export default function BrowseByCategory() {
    const categoryImages = [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&h=400&fit=crop",
    ];

    return (
        <section className="w-full py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">
                    BROWSE BY CATEGORY
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {sampleCategories.slice(0, 5).map((category, index) => (
                        <Link
                            key={category._id}
                            href={`/products?category=${category.slug}`}
                            className="group"
                        >
                            <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={category.imageUrl || categoryImages[index % categoryImages.length]}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-white text-xl font-bold text-center">
                                        {category.name}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}