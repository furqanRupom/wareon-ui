"use client";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/product.interface";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  productUrl: string[];
  category: { name: string; };
}

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-[32px] font-extrabold text-foreground tracking-tight">
              Trending Now
            </h2>
            <p className="text-muted-foreground mt-1">This week's most loved pieces.</p>
          </div>
          <Link href="/shop">
            <Button variant="outline" className="rounded-full border-primary text-primary  cursor-pointer hover:text-on-primary transition-all duration-300 group">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product._id}
              href={`/shop/${product._id}`}
              className="group"
            >
              <div className="bg-surface-container-lowest rounded-[24px] overflow-hidden border border-outline-variant/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[1/1] overflow-hidden bg-surface-container-high">
                  <Image
                    src={product.productUrl[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Favorite button */}
                  <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-foreground hover:text-error transition-all active:scale-90 shadow-md">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                        {product.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mt-1">
                        {product.category.name}
                      </p>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
                      <Star className="w-3.5 h-3.5 fill-tertiary text-tertiary" />
                      <span className="text-[12px] font-bold">4.9</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <span className="text-xl font-extrabold text-foreground">
                      ${product.price}
                    </span>
                    <button className="bg-primary/10 cursor-pointer text-primary hover:text-on-primary w-10 h-10 rounded-full flex items-center justify-center transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Add Star component import
import { Star } from "lucide-react";
