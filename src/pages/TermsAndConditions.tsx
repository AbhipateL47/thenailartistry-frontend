import React from "react";
import { FileText, User, ShoppingBag, CreditCard, AlertTriangle, Scale, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export default function TermsAndConditions() {
  usePageTitle('Terms & Conditions - Legal Agreement');

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
        "• We reserve the right to suspend or terminate accounts that violate these terms"
      ]
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
        "• We strive to maintain accurate inventory, but stock levels are subject to change"
      ]
    },
    {
      icon: CreditCard,
      title: "Pricing & Payments",
      content: [
        "Pricing Information:",
        "• All prices are listed in Indian Rupees (INR) and are subject to change without notice",
        "• Prices include applicable taxes unless otherwise stated",
        "• We reserve the right to correct pricing errors, even after order confirmation",
        "• Payment Processing:",
        "• Payments are securely processed via trusted third-party gateways (Razorpay, etc.)",
        "• We do not store your card details, CVV, or UPI PINs on our servers",
        "• Payment gateways use industry-standard encryption and security protocols",
        "• You agree to provide accurate payment information and authorize charges for your orders"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Order Acceptance",
      content: [
        "Order Processing:",
        "• Order confirmation does not guarantee acceptance of your order",
        "• We reserve the right to accept, reject, or cancel any order at our discretion",
        "• Reasons for order rejection may include:",
        "  - Product unavailability or stock limitations",
        "  - Payment verification failures or suspicious transactions",
        "  - Incorrect pricing or promotional code misuse",
        "  - Suspected fraudulent activity or violation of terms",
        "• If we cancel your order, you will receive a full refund to your original payment method"
      ]
    },
    {
      icon: FileText,
      title: "Cancellations & Refunds",
      content: [
        "Order Cancellation:",
        "• You may cancel your order before it is processed or shipped",
        "• Once an order is shipped, cancellation may not be possible",
        "• Custom or personalized products cannot be cancelled after production begins",
        "• Refund Policy:",
        "• Refunds are processed for cancelled orders, damaged products, or incorrect items",
        "• Refunds are issued to the original payment method within 7-14 business days",
        "• Processing times may vary depending on your payment gateway",
        "• Return shipping costs may apply for certain refund scenarios"
      ]
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      content: [
        "Content Ownership:",
        "• All content on this website, including text, images, designs, logos, and layouts, is the intellectual property of The Nail Artistry",
        "• Product designs, images, and descriptions are protected by copyright and trademark laws",
        "• You may not copy, reproduce, distribute, or create derivative works without written permission",
        "• Unauthorized use of our intellectual property may result in legal action",
        "• User-generated content (reviews, images) grants us a license to use such content for marketing purposes"
      ]
    },
    {
      icon: Scale,
      title: "Limitation of Liability",
      content: [
        "Disclaimer:",
        "• We provide our website and services 'as is' without warranties of any kind",
        "• We shall not be liable for any indirect, incidental, special, or consequential damages",
        "• Our liability is limited to the value of the products purchased",
        "• We are not responsible for delays caused by third-party services (shipping, payment processors)",
        "• We are not liable for damages resulting from misuse of products or failure to follow instructions",
        "• Force majeure events (natural disasters, pandemics, etc.) may affect our ability to fulfill orders"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#FDF8F8]">
      {/* Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-[#FDF8F8] via-pink-50/50 to-purple-50/30 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#DD2C6C]/10 text-[#DD2C6C] border-[#DD2C6C]/20 mb-4">
              <FileText className="w-3 h-3 mr-1" />
              LEGAL AGREEMENT
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Terms & <span className="text-[#DD2C6C]">Conditions</span>
            </h1>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              By accessing or using this website, you agree to be bound by these Terms and Conditions. Please read them carefully before making a purchase.
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to The Nail Artistry. These Terms and Conditions govern your use of our website and services. By accessing our website, creating an account, or making a purchase, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree with any part of these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.
              </p>
            </div>

            {/* Terms Sections */}
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-[#DD2C6C]/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#DD2C6C]" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        {section.title}
                      </h2>
                      <ul className="space-y-2">
                        {section.content.map((item, idx) => (
                          <li
                            key={idx}
                            className={`text-gray-700 leading-relaxed ${
                              item.endsWith(':') ? 'font-semibold text-gray-900' : 'pl-4'
                            }`}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Governing Law */}
            <div className="bg-gradient-to-br from-[#DD2C6C]/10 to-pink-50/50 rounded-2xl p-8 border border-[#DD2C6C]/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising from or relating to these terms or your use of our website shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Terms?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@thenailartistry.store</p>
                <p><strong>Phone:</strong> +91 7225955292</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
