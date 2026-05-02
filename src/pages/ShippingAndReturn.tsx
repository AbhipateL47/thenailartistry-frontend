import React from "react";
import { Truck, Package, RefreshCw, AlertCircle, CreditCard, XCircle, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

const shippingInfo = [
  {
    icon: Package,
    title: "Processing Time",
    content: [
      "• Orders are typically processed within 24–48 hours after payment confirmation",
      "• Custom or made-to-order nail art products may require 3–5 business days for processing",
      "• Processing time excludes weekends and public holidays",
      "• You will receive an email confirmation once your order is processed and ready to ship",
    ],
  },
  {
    icon: Truck,
    title: "Shipping Methods",
    content: [
      "• Standard Shipping: 3–5 business days (Free on orders above ₹799)",
      "• Express Shipping: 1–2 business days (Additional charges apply)",
      "• Shipping charges are calculated at checkout based on your location",
      "• We ship to all major cities and towns across India",
      "• International shipping is currently not available",
    ],
  },
  {
    icon: AlertCircle,
    title: "Delivery Issues",
    content: [
      "• Delays caused by courier partners, weather conditions, or incorrect address details are outside our control",
      "• If your order is delayed, we will notify you via email or SMS",
      "• Please ensure your delivery address is complete and accurate",
      "• Contact us immediately if your order hasn't arrived within the estimated delivery time",
    ],
  },
];

const returnInfo = [
  {
    icon: RefreshCw,
    title: "Return Policy",
    content: [
      "• Due to hygiene reasons, returns are not accepted for used nail art products",
      "• Unopened, unused products in original packaging can be returned within 7 days of delivery",
      "• Custom or personalized products cannot be returned unless damaged or incorrect",
      "• Products must be in their original condition with all tags and packaging intact",
      "• Return requests must be initiated within 48 hours of delivery",
    ],
  },
  {
    icon: AlertCircle,
    title: "Damaged or Wrong Orders",
    content: [
      "• If you receive a damaged or incorrect item, contact us immediately (within 48 hours)",
      "• Please provide clear images of the damaged product or incorrect item",
      "• We will arrange for a replacement or full refund, including return shipping costs",
      "• We take full responsibility for shipping errors and damaged products",
    ],
  },
  {
    icon: CreditCard,
    title: "Refunds",
    content: [
      "• Approved refunds are processed to the original payment method",
      "• Refund processing time: 7–14 business days after we receive the returned product",
      "• Processing times may vary depending on your payment gateway",
      "• Shipping charges are non-refundable unless the order was incorrect or damaged",
      "• You will receive an email confirmation once the refund is processed",
    ],
  },
  {
    icon: XCircle,
    title: "Order Cancellations",
    content: [
      "• Orders can be cancelled before they are processed or shipped",
      "• Once an order is shipped, cancellation is not possible",
      "• Custom or personalized orders cannot be cancelled after production begins",
      "• To cancel an order, contact us immediately with your order number",
      "• Cancelled orders will be refunded in full to the original payment method",
    ],
  },
];

function InfoCard({ icon: Icon, title, items }: { icon: React.ElementType; title: string; items: string[] }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#DD2C6C]/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#DD2C6C]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-3">{title}</h3>
          <ul className="space-y-1.5">
            {items.map((item, i) => (
              <li key={i} className="text-sm text-white/55 leading-relaxed">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ShippingAndReturn() {
  usePageTitle('Shipping & Return Policy - Delivery Information');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero */}
      <section className="relative pt-20 pb-14 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#DD2C6C]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Truck className="inline w-3 h-3 mr-1" />
            Delivery & Returns
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Shipping & <span className="text-[#DD2C6C]">Returns</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Everything you need to know about shipping, delivery, returns, and refunds.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10 pt-10">

            {/* Shipping */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#DD2C6C]" />
                </div>
                <h2 className="text-2xl font-black text-white">Shipping Information</h2>
              </div>
              <div className="space-y-4">
                {shippingInfo.map((s, i) => <InfoCard key={i} icon={s.icon} title={s.title} items={s.content} />)}
              </div>
            </div>

            {/* Returns */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-[#DD2C6C]" />
                </div>
                <h2 className="text-2xl font-black text-white">Returns & Refunds</h2>
              </div>
              <div className="space-y-4">
                {returnInfo.map((s, i) => <InfoCard key={i} icon={s.icon} title={s.title} items={s.content} />)}
              </div>
            </div>

            {/* Important notes */}
            <div className="bg-[#DD2C6C]/8 border border-[#DD2C6C]/25 rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#DD2C6C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-white mb-3">Important Notes</h3>
                  <ul className="space-y-1.5 text-sm text-white/55">
                    <li>• Always inspect your package upon delivery and report any issues within 48 hours</li>
                    <li>• Keep your order confirmation email and tracking number for reference</li>
                    <li>• For return requests, include your order number and reason for return</li>
                    <li>• Return shipping costs are the customer's responsibility unless the product is damaged or incorrect</li>
                    <li>• We reserve the right to refuse returns that don't meet our return policy criteria</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-3">Need Help?</h2>
              <p className="text-white/55 text-sm mb-3">Our support team is available Mon–Sat, 10 AM – 6 PM IST.</p>
              <div className="space-y-1 text-sm text-white/65">
                <p><span className="text-white/40">Email:</span> <span className="text-white">info@thenailartistry.store</span></p>
                <p><span className="text-white/40">Phone:</span> <span className="text-white">+91 72259 55292</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
