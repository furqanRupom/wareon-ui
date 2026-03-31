// components/footer.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const companyLinks = [
        { name: "About", href: "#" },
        { name: "Features", href: "#" },
        { name: "Works", href: "#" },
        { name: "Career", href: "#" },
    ];

    const helpLinks = [
        { name: "Customer Support", href: "#" },
        { name: "Delivery Details", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ];

    const accountLinks = [
        { name: "Manage Deliveries", href: "#" },
        { name: "Orders", href: "#" },
        { name: "Payments", href: "#" },
    ];

    const resourcesLinks = [
        { name: "Free eBooks", href: "#" },
        { name: "Development Tutorial", href: "#" },
        { name: "How to - Blog", href: "#" },
        { name: "Youtube Playlist", href: "#" },
    ];

    // const socialIcons = [
    //     { Icon: Facebook, href: "#", label: "Facebook" },
    //     { Icon: Twitter, href: "#", label: "Twitter" },
    //     { Icon: Instagram, href: "#", label: "Instagram" },
    //     { Icon: Youtube, href: "#", label: "Youtube" },
    // ];

    return (
        <footer className="bg-background border-t border-border/50">
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Newsletter Section */}
                <div className="bg-primary/10 rounded-2xl p-6 md:p-8 mb-12 md:mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                                STAY UP TO DATE ABOUT
                                <br />
                                OUR LATEST OFFERS
                            </h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="pl-12 pr-4 py-6 bg-background border-border rounded-full w-full"
                                />
                            </div>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 w-full">
                                Subscribe to Newsletter
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-bold text-foreground">WAREON.</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We have clothes that suits your style and which you're proud to wear.
                            From women to men.
                        </p>
                        {/* <div className="flex gap-3 pt-2">
                            {socialIcons.map(({ Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex items-center justify-center group"
                                    aria-label={label}
                                >
                                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                                </Link>
                            ))}
                        </div> */}
                    </div>

                    {/* Company Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground text-lg">Company</h4>
                        <ul className="space-y-2">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground text-lg">Help</h4>
                        <ul className="space-y-2">
                            {helpLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account & Resources Combined */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground text-lg">Account</h4>
                        <ul className="space-y-2 mb-6">
                            {accountLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <h4 className="font-semibold text-foreground text-lg pt-2">Resources</h4>
                        <ul className="space-y-2">
                            {resourcesLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} WAREON. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}