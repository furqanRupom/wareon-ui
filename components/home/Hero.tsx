"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

const heroSlides = [
  {
    title: "iPhone 16 Pro Max",
    desc: "Featuring A18 Chip, Liquid Glass, and AI-Powered Innovation",
    tag: "LIMITED EDITION",
    image:
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
  },
  {
    title: "Next Gen Performance",
    desc: "Powerful speed with seamless AI integration",
    tag: "NEW ARRIVAL",
    image:
      "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg",
  },
  {
    title: "Ultra Experience",
    desc: "Redefined mobile experience with pro-level features",
    tag: "TRENDING",
    image:
      "https://images.pexels.com/photos/13780425/pexels-photo-13780425.jpeg",
  },
];

const HeroSection = () => {
  return (
    <section className="container mx-auto mt-10 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT BIG HERO CAROUSEL */}
        <div className="lg:col-span-2 rounded-3xl overflow-hidden min-h-130 relative">

          <Carousel plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]} className="w-full h-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="relative">
                  <div className="relative min-h-130 w-full">

                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      className="object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

                    {/* content */}
                    <div className="absolute inset-0 flex items-center p-8 md:p-12 text-white z-10">
                      <div className="max-w-xl space-y-6">

                        <Badge className="bg-primary/10 border border-primary/20 text-primary backdrop-blur-md">
                          {slide.tag}
                        </Badge>

                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                          {slide.title}
                        </h1>

                        <p className="text-white/80">{slide.desc}</p>

                        <Link href="/shop" >
                          <Button className="rounded-xl cursor-pointer px-6">
                            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* RIGHT SIDE STACK */}
        <div className="flex flex-col gap-6">

          {/* TOP CARD */}
          <div className="rounded-3xl overflow-hidden min-h-[250px] flex bg-secondary">

            {/* TEXT SIDE */}
            <div className="w-[40%] p-6 flex flex-col justify-center space-y-3">
              <h2 className="text-xl font-bold text-foreground">
                Smart Security Home Camera
              </h2>

              <p className="text-sm text-muted-foreground">
                Save up to{" "}
                <span className="text-primary font-semibold">$450</span>
              </p>
            </div>

            {/* IMAGE SIDE */}
            <div className="w-[60%] relative">
              <Image
                src="https://images.pexels.com/photos/27505236/pexels-photo-27505236.jpeg"
                alt="Camera"
                fill
                className="object-cover"
              />
            </div>

          </div>

          {/* BOTTOM CARD */}
          <div className="rounded-3xl overflow-hidden min-h-[250px] flex bg-muted">

            {/* TEXT SIDE */}
            <div className="w-[40%] p-6 flex flex-col justify-center space-y-3">
              <h2 className="text-xl font-bold text-foreground">
                Galaxy S24 Ultra 5G
              </h2>

              <p className="text-sm text-muted-foreground">
                Save up to{" "}
                <span className="text-primary font-semibold">$600</span>
              </p>
            </div>

            {/* IMAGE SIDE */}
            <div className="w-[60%] relative">
              <Image
                src="https://images.pexels.com/photos/13780425/pexels-photo-13780425.jpeg"
                alt="Galaxy S24"
                fill
                className="object-cover"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
