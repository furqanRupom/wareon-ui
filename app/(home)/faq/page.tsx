import { Metadata } from "next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail } from "lucide-react";
import Link from "next/link";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
export const metadata: Metadata = {
    title: "FAQ - Wareon",
    description: "Answers to common questions about orders, cash on delivery, shipping, and returns at Wareon.",
};

const FAQ_SECTIONS = [
    {
        category: "Orders & Payment",
        items: [
            {
                q: "How do I pay for my order?",
                a: "Wareon operates on cash on delivery (COD) only. There's no online payment — you pay in cash directly to our delivery agent when your order arrives at your door.",
            },
            {
                q: "Do you accept card or mobile payments?",
                a: "Not at this time. We currently only accept cash payment at the point of delivery. We're a cash-only, COD operation.",
            },
            {
                q: "Can I change or cancel my order after placing it?",
                a: "You can cancel or edit an order within 1 hour of placing it, as long as it hasn't entered processing. Contact support right away and we'll do our best to help.",
            },
            {
                q: "I received the wrong item. What do I do?",
                a: "We're sorry about that. Reach out to our support team with your order number and a photo of what you received, and we'll arrange a replacement or refund.",
            },
        ],
    },
    {
        category: "Delivery",
        items: [
            {
                q: "How does cash on delivery work?",
                a: "Once your order is confirmed, our delivery agent brings it directly to your address. You inspect the items and hand over the exact cash amount shown on your order summary at that time.",
            },
            {
                q: "How long does delivery take?",
                a: "Standard delivery typically takes 3–5 business days. Availability may vary slightly depending on your location.",
            },
            {
                q: "Do I need exact change?",
                a: "We recommend having the exact amount ready, as our delivery agents may not always carry change. Your order total is shown clearly at checkout and in your order confirmation.",
            },
            {
                q: "What if I'm not home when the order arrives?",
                a: "Our delivery agent will attempt to contact you using the phone number on your order. If delivery can't be completed, we'll arrange a redelivery for a later time.",
            },
            {
                q: "Do you deliver everywhere?",
                a: "We currently deliver within our supported regions. If your address is outside our delivery zone, this will be flagged at checkout before you confirm your order.",
            },
        ],
    },
    {
        category: "Returns",
        items: [
            {
                q: "What is your return policy?",
                a: "Most items can be returned within 30 days of delivery, provided they're unused and in original packaging. Since payment is made on delivery, refunds for approved returns are issued in cash or as store credit.",
            },
            {
                q: "How do I start a return?",
                a: "Go to your Orders page, select the item you'd like to return, and follow the prompts. Our team will reach out to arrange pickup.",
            },
            {
                q: "Can I refuse an item at delivery?",
                a: "Yes. If something looks wrong or damaged, you're welcome to refuse the item at the door — you won't be charged for anything you don't accept.",
            },
        ],
    },
    {
        category: "Account",
        items: [
            {
                q: "Do I need an account to place an order?",
                a: "No, guest checkout is available. Creating an account lets you track orders, save delivery details, and check out faster next time.",
            },
            {
                q: "How do I reset my password?",
                a: "Click \"Forgot password\" on the login page and we'll send a reset link to your registered email address.",
            },
        ],
    },
];

export default function FaqPage() {
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
                            <BreadcrumbPage>Faq</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
                        Frequently asked questions
                    </h1>
                    <p className="text-muted-foreground text-base">
                        Everything you need to know about shopping with Wareon, cash on delivery.
                    </p>
                </div>

                <div className="space-y-10">
                    {FAQ_SECTIONS.map((section) => (
                        <div key={section.category}>
                            <h2 className="text-lg font-semibold text-foreground mb-3">
                                {section.category}
                            </h2>
                            <Accordion type="single" collapsible className="w-full">
                                {section.items.map((item, i) => (
                                    <AccordionItem key={i} value={`${section.category}-${i}`}>
                                        <AccordionTrigger className="text-left text-sm font-medium">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                <div className="mt-16 rounded-2xl border border-border bg-muted/40 p-8 text-center">
                    <Mail className="h-6 w-6 text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-medium text-foreground mb-1">Still have questions?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Our support team is happy to help with anything not covered here.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center text-sm font-medium text-primary hover:underline underline-offset-4"
                    >
                        Contact support
                    </Link>
                </div>
            </div>
        </div>
    );
}
