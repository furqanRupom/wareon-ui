import { Truck, ShieldCheck, RotateCcw, BadgeCheck } from "lucide-react"

const items = [
  { icon: Truck, title: "Free Shipping", desc: "Orders over $100" },
  { icon: BadgeCheck, title: "2 Year Warranty", desc: "Guaranteed quality" },
  { icon: ShieldCheck, title: "Secure Pay", desc: "100% Encrypted" },
  { icon: RotateCcw, title: "30 Day Return", desc: "No questions asked" },
]

export const TrustSection = () => {
  return (
    <section className="py-10 border-y bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <item.icon className="text-primary" />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
