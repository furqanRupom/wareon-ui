import { Metadata } from "next";
import { Leaf, HandCoins, Users, Sparkles } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
    title: "Our Story - Wareon",
    description: "Learn about Wareon's mission to bring curated, modern essentials to everyday life — with simple, trust-first cash on delivery.",
};

const VALUES = [
    {
        icon: Sparkles,
        title: "Thoughtfully curated",
        description: "Every product is selected for quality and lasting design, not trends.",
    },
    {
        icon: Leaf,
        title: "Built to last",
        description: "We partner with makers who care about durability over disposability.",
    },
    {
        icon: HandCoins,
        title: "Pay when it arrives",
        description: "Cash on delivery, no online payment required — you only pay once you've seen your order.",
    },
    {
        icon: Users,
        title: "Community first",
        description: "We grow by listening to the people who shop with us, not by guessing.",
    },
];

export default function OurStoryPage() {
    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 pt-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>our story</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            {/* Hero */}
            <div className="container mx-auto px-4 pt-14 pb-10 md:pt-20 md:pb-14 max-w-3xl text-center">
                <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
                    Our story
                </p>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-5">
                    Modern essentials, made with intention
                </h1>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    Wareon started with a simple frustration: too many products built to be
                    replaced, not lived with. We set out to build a shop where every item
                    earns its place — and where buying it feels just as straightforward.
                </p>
            </div>

            {/* Body */}
            <div className="container mx-auto px-4 pb-16 max-w-2xl">
                <div className="space-y-6 text-foreground/90 leading-relaxed text-base">
                    <p>
                        It began as a small project between a handful of people who were tired
                        of sifting through endless, identical listings to find things that
                        actually felt considered. We wanted a place where the headphones, the
                        chair, the everyday tools in your life were chosen the way a good friend
                        would recommend them — because they're genuinely worth owning.
                    </p>
                    <p>
                        We also believe buying something shouldn't require handing over your
                        card details to a website you've never used before. That's why Wareon
                        runs entirely on cash on delivery — you order, we bring it to your door,
                        and you pay in person once you've seen exactly what you're getting.
                        No online payment, no stored card numbers, no surprises.
                    </p>
                    <p>
                        Today, Wareon works directly with a small set of makers and brands who
                        share that same standard of quality. We don't chase every trend or
                        stock every category. Instead, we focus on getting a smaller set of
                        things right: good materials, fair prices, and a buying experience
                        built on trust rather than friction.
                    </p>
                    <p>
                        We're still early in this journey, and we're building it one order, one
                        delivery, and one returning customer at a time.
                    </p>
                </div>
            </div>

            {/* Values */}
            <div className="border-t border-border">
                <div className="container mx-auto px-4 py-14">
                    <h2 className="text-xl font-semibold text-foreground text-center mb-10">
                        What we stand for
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {VALUES.map((value) => {
                            const Icon = value.icon;
                            return (
                                <div key={value.title} className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                        <Icon className="h-5 w-5 text-foreground" />
                                    </div>
                                    <h3 className="font-medium text-foreground text-sm mb-1.5">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
