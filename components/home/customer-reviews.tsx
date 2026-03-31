// components/sections/customer-reviews.tsx
"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Review {
    _id: string;
    customerName: string;
    customerAvatar?: string;
    rating: number;
    review: string;
    date: string;
}

const sampleReviews: Review[] = [
    {
        _id: "1",
        customerName: "Sarah Johnson",
        rating: 5,
        review: "Absolutely love the quality! The fabric is premium and fits perfectly. Will definitely shop again.",
        date: "2024-03-15"
    },
    {
        _id: "2",
        customerName: "Michael Chen",
        rating: 5,
        review: "Great customer service and fast shipping. The clothes are exactly as pictured. Highly recommended!",
        date: "2024-03-10"
    },
    {
        _id: "3",
        customerName: "Emma Davis",
        rating: 4,
        review: "Really impressed with the quality. The fit is perfect and the material feels premium. Will buy again.",
        date: "2024-03-05"
    },
    {
        _id: "4",
        customerName: "James Wilson",
        rating: 5,
        review: "Best shopping experience ever! The products are top-notch and delivery was super fast.",
        date: "2024-03-01"
    },
    {
        _id: "5",
        customerName: "Lisa Martinez",
        rating: 5,
        review: "Amazing collection! Found exactly what I was looking for. The quality exceeded my expectations.",
        date: "2024-02-25"
    },
];

export default function CustomerReviews() {
    return (
        <section className="w-full py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8 md:mb-12">
                    WHAT OUR CUSTOMERS SAY
                </h2>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        slidesToScroll: 1,
                        containScroll: "trimSnaps",
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-4">
                        {sampleReviews.map((review) => (
                            <CarouselItem
                                key={review._id}
                                className="pl-4 md:basis-1/2 lg:basis-1/3"
                            >
                                <Card className="bg-card border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                                    <CardContent className="p-6 md:p-8">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-primary/10 shrink-0">
                                                {review.customerAvatar ? (
                                                    <Image
                                                        src={review.customerAvatar}
                                                        alt={review.customerName}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-primary font-bold text-lg">
                                                        {review.customerName.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground text-lg">
                                                    {review.customerName}
                                                </h4>
                                                <div className="flex gap-1 mt-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < review.rating
                                                                    ? "fill-primary text-primary"
                                                                    : "fill-muted text-muted-foreground"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                                            "{review.review}"
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-4">
                                            {new Date(review.date).toLocaleDateString()}
                                        </p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 border-border  hover:bg-primary hover:text-primary-foreground transition-colors" />
                    <CarouselNext className="hidden md:flex -right-4 lg:-right-12 border-border  hover:bg-primary hover:text-primary-foreground transition-colors" />
                </Carousel>
            </div>
        </section>
    );
}