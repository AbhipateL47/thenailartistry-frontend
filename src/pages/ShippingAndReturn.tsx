import React from "react";
import { Truck, Package, RefreshCw, AlertCircle, CreditCard, XCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export default function ShippingAndReturn() {
  usePageTitle('Shipping & Return Policy - Delivery Information');

  const shippingInfo = [
    {
      icon: Package,
      title: "Processing Time",
      content: [
        "• Orders are typically processed within 24-48 hours after payment confirmation",
        "• Custom or made-to-order nail art products may require 3-5 business days for processing",
        "• Processing time excludes weekends and public holidays",
        "• You will receive an email confirmation once your order is processed and ready to ship"
      ]
    },
    {
      icon: Truck,
      title: "Shipping Methods",
      content: [
        "• Standard Shipping: 3-5 business days (Free on orders above ₹999)",
        "• Express Shipping: 1-2 business days (Additional charges apply)",
        "• Shipping charges are calculated at checkout based on your location",
        "• We ship to all major cities and towns across India",
        "• International shipping is currently not available"
      ]
    },
    {
      icon: AlertCircle,
      title: "Delivery Issues",
      content: [
        "• Delays caused by courier partners, weather conditions, or incorrect address details are outside our control",
        "• If your order is delayed, we will notify you via email or SMS",
        "• Please ensure your delivery address is complete and accurate",
        "• If a delivery attempt fails, the courier will make additional attempts as per their policy",
        "• Contact us immediately if your order hasn't arrived within the estimated delivery time"
      ]
    }
  ];

  const returnInfo = [
    {
      icon: RefreshCw,
      title: "Return Policy",
      content: [
        "• Due to hygiene and customization reasons, returns are not accepted for used nail art products",
        "• Unopened, unused products in original packaging can be returned within 7 days of delivery",
        "• Custom or personalized products cannot be returned unless damaged or incorrect",
        "• Products must be in their original condition with all tags and packaging intact",
        "• Return requests must be initiated within 48 hours of delivery"
      ]
    },
    {
      icon: AlertCircle,
      title: "Damaged or Wrong Orders",
      content: [
        "• If you receive a damaged or incorrect item, contact us immediately (within 48 hours)",
        "• Please provide clear images of the damaged product or incorrect item",
        "• We will arrange for a replacement or full refund, including return shipping costs",
        "• Our customer support team will guide you through the return/replacement process",
        "• We take full responsibility for shipping errors and damaged products"
      ]
    },
    {
      icon: CreditCard,
      title: "Refunds",
      content: [
        "• Approved refunds are processed to the original payment method",
        "• Refund processing time: 7-14 business days after we receive the returned product",
        "• Processing times may vary depending on your payment gateway (Razorpay, etc.)",
        "• Shipping charges are non-refundable unless the order was incorrect or damaged",
        "• You will receive an email confirmation once the refund is processed"
      ]
    },
    {
      icon: XCircle,
      title: "Order Cancellations",
      content: [
        "• Orders can be cancelled before they are processed or shipped",
        "• Once an order is shipped, cancellation is not possible",
        "• Custom or personalized orders cannot be cancelled after production begins",
        "• To cancel an order, contact us immediately with your order number",
        "• Cancelled orders will be refunded in full to the original payment method"
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
              <Truck className="w-3 h-3 mr-1" />
              DELIVERY & RETURNS
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Shipping & <span className="text-[#DD2C6C]">Return Policy</span>
            </h1>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              We want to ensure you have a smooth shopping experience. Here's everything you need to know about shipping, delivery, returns, and refunds.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Shipping Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#DD2C6C]/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#DD2C6C]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              <div className="space-y-6">
                {shippingInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-[#DD2C6C]/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#DD2C6C]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {info.title}
                          </h3>
                          <ul className="space-y-2">
                            {info.content.map((item, idx) => (
                              <li key={idx} className="text-gray-700 leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Returns Section */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#DD2C6C]/10 w-10 h-10 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-[#DD2C6C]" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Returns & Refunds</h2>
              </div>
              <div className="space-y-6">
                {returnInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-[#DD2C6C]/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-[#DD2C6C]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {info.title}
                          </h3>
                          <ul className="space-y-2">
                            {info.content.map((item, idx) => (
                              <li key={idx} className="text-gray-700 leading-relaxed">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-gradient-to-br from-[#DD2C6C]/10 to-pink-50/50 rounded-2xl p-8 border border-[#DD2C6C]/20">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#DD2C6C] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Important Notes</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Always inspect your package upon delivery and report any issues within 48 hours</li>
                    <li>• Keep your order confirmation email and tracking number for reference</li>
                    <li>• For return requests, include your order number and reason for return</li>
                    <li>• Return shipping costs are the customer's responsibility unless the product is damaged or incorrect</li>
                    <li>• We reserve the right to refuse returns that don't meet our return policy criteria</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about shipping, returns, or need assistance with your order, our customer support team is here to help:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@thenailartistry.store</p>
                <p><strong>Phone:</strong> +91 7225955292</p>
                <p className="text-sm text-gray-600 mt-4">
                  Our support team is available Monday to Saturday, 10 AM to 6 PM IST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
