
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const brandList = [
    { name: "AltraTech", desc: "Precision-engineered computing components.", category: "Technology" },
    { name: "Basis", desc: "Fundamental furniture for the contemporary home.", category: "Furniture" },
    { name: "Cinder", desc: "Outdoor cooking and thermal insulation tech.", category: "Outdoor" },
    { name: "DuoForm", desc: "Dual-purpose ergonomic office solutions.", category: "Office" },
    { name: "Element", desc: "Eco-conscious lifestyle and apparel brand.", category: "Lifestyle" },
    { name: "Flux", desc: "Next-gen lighting and ambient control.", category: "Lighting" },
    { name: "Giga", desc: "High-capacity data storage and networking.", category: "Technology" },
    { name: "Halo", desc: "Premium wearable wellness monitoring.", category: "Health" },
    { name: "Iconic", desc: "Heritage designs reimagined for today.", category: "Design" },
];

const featured = [
    { name: "AuraSound", desc: "Redefining high-fidelity acoustics for the modern workspace.", badge: "Featured" },
    { name: "TerraBrew", desc: "Artisanal coffee engineering for the discerning palate.", badge: "New" },
    { name: "NeoHome", desc: "Smart home experience redefined.", badge: "Popular" },
    { name: "Corex", desc: "Advanced material science and textiles.", badge: "Premium" },
];

const alphabet = "ABCDEFGHIJKLM".split("");

export default function BrandsPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* BREADCRUMB */}
            <div className="container mx-auto px-4 pt-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Partners</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            {/* HEADER SECTION */}
            <section className="container mx-auto px-4 pt-12 pb-8 text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <Badge variant="secondary" className="text-sm">
                        9+ Partner Brands
                    </Badge>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                    Our Partners
                </h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    We collaborate with visionary brands that define the intersection of 
                    <span className="text-primary font-medium"> technology</span>, 
                    <span className="text-primary font-medium"> craftsmanship</span>, and 
                    <span className="text-primary font-medium"> modern living</span>.
                </p>
            </section>

            {/* SEARCH + FILTERS */}
            <section className="container mx-auto px-4 mb-16">
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
                    
                    {/* Search Input */}
                    <div className="relative w-full lg:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find a brand..."
                            className="pl-10 h-12 bg-card border-border"
                        />
                    </div>

                    {/* Alphabet Filter */}
                    <div className="flex gap-1.5 overflow-x-auto pb-2 w-full lg:w-auto">
                        <Badge 
                            variant="default" 
                            className="px-4 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            ALL
                        </Badge>
                        {alphabet.map((l) => (
                            <Badge
                                key={l}
                                variant="outline"
                                className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors min-w-[36px]"
                            >
                                {l}
                            </Badge>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED SECTION */}
            <section className="container mx-auto px-4 mb-20">
                <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-foreground">
                        Featured Labels
                    </h3>
                    <Badge variant="secondary" className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        Top Picks
                    </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featured.map((b, i) => (
                        <Card 
                            key={i}
                            className="group relative border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer overflow-hidden"
                        >
                            <div className="absolute top-3 right-3">
                                <Badge variant={i === 0 ? "default" : "secondary"} className="text-xs">
                                    {b.badge}
                                </Badge>
                            </div>
                            <CardHeader className="pb-3 pt-5 px-5">
                                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {b.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5">
                                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                    {b.desc}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* DIRECTORY */}
            <section className="container mx-auto px-4 mb-24">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-5 mb-10">
                    <h3 className="text-2xl font-bold text-foreground">
                        Brand Directory
                    </h3>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-medium">
                            {brandList.length} Partners
                        </Badge>
                        <span className="text-sm text-muted-foreground">Total</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {brandList.map((b) => (
                        <Card 
                            key={b.name}
                            className="group flex items-start gap-4 p-5 border-border bg-card hover:border-primary/50 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 text-primary font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                                {b.name[0]}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {b.name}
                                    </h4>
                                    <Badge variant="outline" className="text-xs px-1.5">
                                        {b.category}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground leading-snug line-clamp-2">
                                    {b.desc}
                                </p>
                            </div>

                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </Card>
                    ))}
                </div>
            </section>

            {/* APPLY SECTION */}
            <section className="container mx-auto px-4 mb-16">
                <Card className="p-8 md:p-10 bg-gradient-to-br from-muted via-muted to-muted/80 border-border overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                Become a Partner
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Join the <span className="text-primary font-semibold">Wareon</span> ecosystem and 
                                reach our global audience of thousands of customers.
                            </p>
                            <div className="flex items-center gap-4 mt-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-sm text-muted-foreground">Global Reach</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                    <span className="text-sm text-muted-foreground">Marketing Support</span>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="px-8 h-14 font-semibold group">
                            Apply to Join
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </Card>
            </section>

            <div className="h-8" />
        </div>
    );
}
