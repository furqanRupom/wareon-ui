import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-16 space-y-12">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Brand / Logo Section */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-primary">
              WAREON.
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed">
              We have clothes that suit your style and which you're proud to
              wear. From women to men.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Shop</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/shop" className="hover:text-primary">
                All Products
              </Link>
              <Link href="/shop" className="hover:text-primary">
                Categories
              </Link>
              <Link href="/shop" className="hover:text-primary">
                New Arrivals
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Support</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/faq" className="hover:text-primary">
                FAQ
              </Link>
              <Link href="/privacy-policy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/frands" className="hover:text-primary">
                Refunds
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wareon. All rights reserved.
          </p>

          <div className="flex gap-4 text-sm text-muted-foreground">
            <span className="hover:text-primary cursor-pointer">
              English
            </span>
            <span className="hover:text-primary cursor-pointer">
              USD
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
