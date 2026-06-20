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
  { _id: "1", name: "The Tech Lab", slug: "electronics" },
  { _id: "2", name: "Modern Atelier", slug: "fashion" },
  { _id: "3", name: "Home Objects", slug: "home" },
  { _id: "4", name: "Accessories", slug: "accessories" },
  { _id: "5", name: "Footwear", slug: "footwear" },
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
    <section className="py-24 px-4 md:px-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <h2 className="text-[32px] font-extrabold text-foreground tracking-tight">
            Shop by Category
          </h2>
          <p className="text-muted-foreground mt-2">
            Explore our meticulously curated collections.
          </p>
        </div>
        <Link href="/shop" className="group text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
          Browse All Categories
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Categories Grid - Masonary layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-[700px]">
        {/* Large category (Tech Lab) */}
        <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[24px]">
          <Image
            src={categoryImages[0]}
            alt="Electronics"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-10 flex flex-col justify-end">
            <span className="text-white/70 text-sm font-bold mb-2">MOST POPULAR</span>
            <h3 className="text-white text-3xl font-extrabold mb-4">The Tech Lab</h3>
            <Link href="/shop">
            <button className="w-fit bg-primary  px-8 py-3 rounded-full font-bold text-sm cursor-pointer hover:text-on-primary transition-colors">
              Explore Now
            </button>
          </Link>
          </div>
        </div>

        {/* Fashion */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-[24px]">
          <Image
            src={categoryImages[1]}
            alt="Fashion"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-extrabold">Modern Atelier</h3>
            <p className="text-white/80 text-sm mt-1">Premium apparel & accessories</p>
          </div>
        </div>

        {/* Home */}
        <div className="md:col-span-2 group relative overflow-hidden rounded-[24px]">
          <Image
            src={categoryImages[2]}
            alt="Home"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-8 flex flex-col justify-end">
            <h3 className="text-white text-2xl font-extrabold">Home Objects</h3>
            <p className="text-white/80 text-sm mt-1">Refined living essentials</p>
          </div>
        </div>
      </div>
    </section>
  );
}
