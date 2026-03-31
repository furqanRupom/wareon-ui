"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
    const stats = [
        { value: "200+", label: "International Brands" },
        { value: "2,000+", label: "High-Quality Products" },
        { value: "30,000+", label: "Happy Customers" },
    ];

    return (
        <section className="relative w-full overflow-hidden bg-background max-w-7xl mx-auto">
            <div className="container relative mx-auto px-4 py-12 md:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-8 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                            FIND CLOTHES THAT
                            <br />
                            MATCHES YOUR STYLE
                        </h1>

                        <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                            Browse through our diverse range of meticulously crafted garments,
                            designed to bring out your individuality and cater to your sense of style.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-base font-medium shadow-lg transition-all duration-300 hover:shadow-xl group"
                            >
                                Shop Now
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border/50 mt-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center sm:text-left space-y-1">
                                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Images */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Image 1 - Shirt */}
                            <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop"
                                    alt="Stylish shirt"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </div>

                            {/* Image 2 - T-Shirt */}
                            <div className="relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg mt-8">
                                <Image
                                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=800&fit=crop"
                                    alt="Casual t-shirt"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                            </div>

                            {/* Image 3 - Jacket (spans both columns) */}
                            <div className="col-span-2 relative aspect-video rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src="https://cdn.pixabay.com/photo/2021/03/08/12/06/oxford-shoes-6078951_1280.jpg"
                                    alt="Stylish jacket"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    sizes="100vw"
                                />
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}