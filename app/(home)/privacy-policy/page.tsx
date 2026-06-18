// app/privacy-policy/page.tsx
import { Metadata } from "next";
import {
  Calendar,
  Mail,
  MapPin,
  Shield,
  Settings,
  UserCheck,
  ArrowUp,
  BookMarked,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Wareon",
  description: "At Wareon, we prioritize the protection of your personal information. Learn about our privacy practices and your rights.",
};

export default function PrivacyPolicyPage() {
  const tableOfContents = [
    { id: "data-collection", label: "Data Collection" },
    { id: "usage", label: "How We Use Your Info" },
    { id: "cookies", label: "Cookies Policy" },
    { id: "contact", label: "Contact Us" },
  ];

  const usagePurposes = [
    {
      icon: Settings,
      title: "Maintenance",
      description: "To provide and maintain our Service, including monitoring usage.",
    },
    {
      icon: UserCheck,
      title: "Account Management",
      description: "To manage your registration as a user of the Service.",
    },
    {
      icon: UserCheck,
      title: "Communications",
      description: "To contact you by email, phone, or SMS regarding updates or information.",
    },
    {
      icon: BookMarked,
      title: "Analysis",
      description: "To gather analysis or valuable information so that we can improve our Service.",
    },
  ];

  return (
    <main className="pt-32 pb-16 px-4 md:px-6">
      <div className="max-w-[800px] mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">
            Legal Documentation
          </p>
          <h1 className="text-4xl md:text-[64px] font-extrabold text-foreground mb-3 leading-tight">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4" />
            <span>Last updated: October 24, 2023</span>
          </div>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Wareon, we prioritize the protection of your personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of your information when you use our service and tells you about your privacy rights and how the law protects you.
          </p>
        </section>

        {/* Table of Contents */}
        <div className="p-6 bg-surface-container rounded-xl border border-outline-variant mb-12">
          <p className="text-sm font-bold text-primary mb-3">TABLE OF CONTENTS</p>
          <ul className="space-y-2">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-12">
          {/* Data Collection */}
          <section id="data-collection">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                01
              </span>
              Data Collection
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>
                  <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, such as your email address, first and last name, and phone number.
                </li>
                <li>
                  <strong>Usage Data:</strong> Usage Data is collected automatically when using the Service. This may include your Device's IP address, browser type, browser version, and the pages of our Service that you visit.
                </li>
                <li>
                  <strong>Transaction Info:</strong> Details about payments to and from you and other details of products and services you have purchased from us.
                </li>
              </ul>
            </div>
          </section>

          {/* How We Use Your Info */}
          <section id="usage">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                02
              </span>
              How We Use Your Info
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Wareon uses the collected data for various purposes:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {usagePurposes.map((purpose) => (
                  <div key={purpose.title} className="p-4 bg-surface-container-low rounded-lg border border-outline-variant">
                    <purpose.icon className="w-5 h-5 text-primary mb-2" />
                    <h3 className="font-bold mb-1 text-foreground">{purpose.title}</h3>
                    <p className="text-sm text-muted-foreground">{purpose.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Cookies Policy */}
          <section id="cookies">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm">
                03
              </span>
              Cookies Policy
            </h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              <div className="border-l-4 border-primary bg-primary-container/10 p-4 italic text-sm">
                "You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service."
              </div>
            </div>
          </section>

          {/* Contact Us */}
          <section
            id="contact"
            className="bg-surface-container rounded-2xl p-8 border border-outline-variant"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              If you have any questions about this Privacy Policy, you can contact our data protection officer:
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Email Address</p>
                  <p className="text-muted-foreground">privacy@wareon-retail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">Headquarters</p>
                  <p className="text-muted-foreground">123 Commerce Way, Tech District, SF 94103</p>
                </div>
              </div>
            </div>
            <Button className="mt-6 w-full md:w-auto bg-primary hover:bg-primary/90 cursor-pointer px-6 py-2 rounded-lg font-bold transition-all active:scale-95">
              Submit a Request
            </Button>
          </section>
        </div>
      </div>

    </main>
  );
}
