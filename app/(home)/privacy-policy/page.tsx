import { Metadata } from "next";
import {
  Calendar,
  Mail,
  MapPin,
  Settings,
  UserCheck,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Wareon",
  description:
    "At Wareon, we prioritize the protection of your personal information. Learn about our privacy practices and your rights.",
};

export default function PrivacyPolicyPage() {
  const tableOfContents = [
    { id: "data-collection", label: "Data Collection" },
    { id: "usage", label: "How We Use Your Info" },
    { id: "payments", label: "Payment Policy (COD)" },
    { id: "cookies", label: "Cookies Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  const usagePurposes = [
    {
      icon: Settings,
      title: "Maintenance",
      description:
        "To provide and maintain our Service, including monitoring usage.",
    },
    {
      icon: UserCheck,
      title: "Account Management",
      description:
        "To manage your registration as a user of the Service.",
    },
    {
      icon: UserCheck,
      title: "Communications",
      description:
        "To contact you regarding order updates, delivery, or support.",
    },
    {
      icon: BookMarked,
      title: "Analysis",
      description:
        "To improve our Service and user experience.",
    },
  ];

  return (
    <main className="pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
            Legal Documentation
          </p>
          <h1 className="text-4xl md:text-[64px] font-extrabold text-foreground mb-3 leading-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last updated: June 2026</span>
          </div>
        </div>

        {/* Intro */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Wareon, we value your privacy and are committed to protecting your
            personal data. This Privacy Policy explains how we collect, use, and
            safeguard your information when you use our platform.
          </p>
        </section>

        {/* TOC */}
        <div className="p-6 bg-surface-container rounded-xl border mb-12">
          <p className="text-sm font-bold text-primary mb-3">
            TABLE OF CONTENTS
          </p>
          <ul className="space-y-2">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          {/* Data Collection */}
          <section id="data-collection">
            <h2 className="text-2xl font-bold mb-3">Data Collection</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                <strong>Personal Data:</strong> Name, phone number, address for
                delivery.
              </li>
              <li>
                <strong>Usage Data:</strong> Device info, IP, pages visited.
              </li>
              <li>
                <strong>Order Information:</strong> Products ordered and delivery
                details.
              </li>
            </ul>
          </section>

          {/* Usage */}
          <section id="usage">
            <h2 className="text-2xl font-bold mb-3">
              How We Use Your Info
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {usagePurposes.map((purpose) => (
                <div
                  key={purpose.title}
                  className="p-4 rounded-lg border"
                >
                  <purpose.icon className="w-5 h-5 mb-2 text-primary" />
                  <h3 className="font-bold">{purpose.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {purpose.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* COD Payment Policy */}
          <section id="payments">
            <h2 className="text-2xl font-bold mb-3">
              Payment Policy (Cash on Delivery)
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Wareon currently supports <strong>Cash on Delivery (COD)</strong>{" "}
                as the only payment method.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Customers are required to pay in cash at the time of delivery.
                </li>
                <li>
                  We do <strong>not collect or store</strong> any online payment
                  information such as card or banking details.
                </li>
                <li>
                  Your contact and delivery information is used only to fulfill
                  your order.
                </li>
                <li>
                  Orders may be cancelled if delivery cannot be completed.
                </li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section id="cookies">
            <h2 className="text-2xl font-bold mb-3">Cookies Policy</h2>
            <p className="text-muted-foreground">
              We use cookies to improve user experience and analyze traffic.
              You can disable cookies in your browser settings.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="border rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions, contact us:
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <span>privacy@wareon-retail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>

            <Button className="mt-4 w-full md:w-auto">
              Submit a Request
            </Button>
          </section>
        </div>
      </div>
    </main>
  );
}
