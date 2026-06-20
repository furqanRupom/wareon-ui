"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="w-full border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          
          <h2 className="text-2xl md:text-4xl font-bold text-foreground">
            Join the Wareon Journal
          </h2>

          <p className="text-muted-foreground text-sm md:text-base">
            Get updates about products, offers, and design insights.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="wareon@gmail.com"
                className="pl-10"
                required
              />
            </div>

            <Button className="cursor-pointer" type="submit">
              Subscribe
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
