import React from "react";
import { FileText, User, ShoppingBag, CreditCard, AlertTriangle, Scale, Shield } from "lucide-react";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

const sections = [
  {
    icon: User,
    title: "User Accounts",
    content: [
      "Account Registration:",
      "• Users may register using a mobile number, email, or other supported authentication methods",
      "• You must provide accurate, current, and complete information during registration",
      "• You are responsible for maintaining the confidentiality of your account credentials",
      "• You are liable for all activities that occur under your account",
      "• You must notify us immediately of any unauthorized use of your account",
      "• We reserve the right to suspend or terminate accounts that violate these terms",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Products & Services",
    content: [
      "Product Availability:",
      "• All products displayed on our website are subject to availability",
      "• Product images are for reference only and may vary slightly from actual products",
      "• Minor variations may occur due to lighting, photography, customization, or craftsmanship",
      "• We reserve the right to modify product descriptions, prices, and availability without prior notice",
      "• Custom or made-to-order products may have longer processing times",
      "• We strive to maintain accurate inventory, but stock levels are subject to change",
    ],
  },
  {
    icon: CreditCard,
    title: "Pricing & Payments",
    content: [
      "Pricing Information:",
      "• All prices are listed in Indian Rupees (INR) and are subject to change without notice",
      "• Prices include applicable taxes unless otherwise stated",
      "• We reserve the right to correct pricing errors, even after order confirmation",
      "Payment Processing:",
      "• Payments are securely processed via trusted third-party gateways (Razorpay, etc.)",
      "• We do not store your card details, CVV, or UPI PINs on our servers",
      "• You agree to provide accurate payment information and authorize charges for your orders",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Order Acceptance",
    content: [
      "Order Processing:",
      "• Order confirmation does not guarantee acceptance of your order",
      "• We reserve the right to accept, reject, or cancel any order at our discretion",
      "• Reasons for order rejection may include product unavailability, payment failures, or suspected fraud",
      "• If we cancel your order, you will receive a full refund to your original payment method",
    ],
  },
  {
    icon: FileText,
    title: "Cancellations & Refunds",
    content: [
      "Order Cancellation:",
      "• You may cancel your order before it is processed or shipped",
      "• Once an order is shipped, cancellation may not be possible",
      "• Custom or personalized products cannot be cancelled after production begins",
      "Refund Policy:",
      "• Refunds are processed for cancelled orders, damaged products, or incorrect items",
      "• Refunds are issued to the original payment method within 7–14 business days",
      "• Return shipping costs may apply for certain refund scenarios",
    ],
  },
  {
    icon: Shield,
    title: "Intellectual Property",
    content: [
      "Content Ownership:",
      "• All content on this website is the intellectual property of The Nail Artistry",
      "• Product designs, images, and descriptions are protected by copyright and trademark laws",
      "• You may not copy, reproduce, or distribute our content without written permission",
      "• Unauthorized use of our intellectual property may result in legal action",
    ],
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    content: [
      "Disclaimer:",
      "• We provide our website and services 'as is' without warranties of any kind",
      "• We shall not be liable for any indirect, incidental, or consequential damages",
      "• Our liability is limited to the value of the products purchased",
      "• We are not responsible for delays caused by third-party services (shipping, payment processors)",
    ],
  },
];

export default function TermsAndConditions() {
  usePageTitle('Terms & Conditions - Legal Agreement');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero */}
      <section className="relative pt-20 pb-14 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#DD2C6C]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <FileText className="inline w-3 h-3 mr-1" />
            Legal Agreement
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Terms & <span className="text-[#DD2C6C]">Conditions</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto mb-2">
            By accessing or using this website, you agree to be bound by these Terms and Conditions. Please read carefully before making a purchase.
          </p>
          <p className="text-xs text-white/30">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6 pt-10">
            {/* Intro */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <p className="text-white/65 leading-relaxed mb-3">
                Welcome to The Nail Artistry. These Terms and Conditions govern your use of our website and services. By accessing our website, creating an account, or making a purchase, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <p className="text-white/55 leading-relaxed text-sm">
                If you do not agree with any part of these terms, please do not use our website or services.
              </p>
            </div>

            {/* Sections */}
            {sections.map((section, i) => {
              const Icon = section.icon;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-[#DD2C6C]/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-[#DD2C6C]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
                      <ul className="space-y-1.5">
                        {section.content.map((item, idx) => (
                          <li key={idx} className={`text-sm leading-relaxed ${item.endsWith(':') ? 'font-semibold text-white/80 mt-2' : 'text-white/55 pl-2'}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Governing law */}
            <div className="bg-[#DD2C6C]/8 border border-[#DD2C6C]/25 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-3">Governing Law</h2>
              <p className="text-white/55 text-sm leading-relaxed">
                These Terms and Conditions shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-3">Questions About Terms?</h2>
              <p className="text-white/55 text-sm mb-3">If you have any questions about these Terms and Conditions, please contact us:</p>
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
