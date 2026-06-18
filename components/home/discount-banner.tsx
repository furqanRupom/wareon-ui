"use client";

import { Button } from "@/components/ui/button";

export default function DiscountBanner() {
  return (

    <section className=" container mx-auto px-4 my-24">
      <div className="relative overflow-hidden rounded-3xl bg-primary p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">

        {/* 🔳 Grid Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="white"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* 🧾 Content */}
        <div className="relative z-10 max-w-xl">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-bold mb-4">
            FLASH SALE
          </span>

          <h2 className="text-primary-foreground text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Upgrade Your Space <br />
            Save up to 40%
          </h2>

          <p className="text-primary-foreground/80">
            Limited quantities available. Ends Sunday midnight.
          </p>
        </div>

        {/* 🎯 CTA */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <button className="bg-background cursor-pointer text-primary px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition">
            Claim Discount
          </button>

          <p className="text-primary-foreground/70 text-sm">
            Use code: WAREON40
          </p>
        </div>
      </div>
    </section>);
}
