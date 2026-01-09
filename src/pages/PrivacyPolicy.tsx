import React from "react";
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy - Your Data Protection');

  const sections = [
    {
      icon: FileText,
      title: "Information We Collect",
      content: [
        "We collect personal information that you provide directly to us, including:",
        "• Name, phone number, and email address for account creation and order processing",
        "• Delivery address and billing information for order fulfillment",
        "• Order history and preferences to enhance your shopping experience",
        "• Authentication data through OTP verification for secure account access",
        "• Communication records when you contact our customer support"
      ]
    },
    {
      icon: Lock,
      title: "Payment Information",
      content: [
        "Your financial security is our top priority:",
        "• All payments are processed through trusted third-party gateways (Razorpay, etc.)",
        "• We do not store, process, or have access to your card numbers, CVV, or UPI PINs",
        "• Payment gateways use industry-standard encryption (PCI-DSS compliant)",
        "• Transaction details are securely handled by payment processors",
        "• We only receive confirmation of successful payments, not payment details"
      ]
    },
    {
      icon: Eye,
      title: "Cookies & Sessions",
      content: [
        "We use cookies and session tokens to improve your experience:",
        "• Authentication cookies to maintain your login session securely",
        "• Performance cookies to optimize site speed and functionality",
        "• Preference cookies to remember your settings and preferences",
        "• Analytics cookies to understand how you use our website (anonymized data)",
        "• Security tokens to prevent fraud and unauthorized access",
        "You can manage cookie preferences through your browser settings"
      ]
    },
    {
      icon: Shield,
      title: "Data Usage",
      content: [
        "We use your information solely for legitimate business purposes:",
        "• Processing and fulfilling your orders",
        "• Managing your account and providing customer support",
        "• Sending order confirmations, shipping updates, and delivery notifications",
        "• Improving our website, products, and services based on user feedback",
        "• Sending promotional communications (only with your consent)",
        "• Complying with legal obligations and preventing fraud",
        "We do not sell, rent, or share your personal data with third parties for marketing purposes"
      ]
    },
    {
      icon: AlertCircle,
      title: "Admin Access",
      content: [
        "Authorized administrators have limited, controlled access:",
        "• Access is restricted to employees who need it for operational purposes",
        "• All admin access is logged and monitored for security",
        "• Administrators can only view necessary information (order details, contact info)",
        "• Sensitive data like passwords are encrypted and never accessible",
        "• Regular security audits ensure compliance with data protection standards"
      ]
    },
    {
      icon: CheckCircle2,
      title: "Data Security",
      content: [
        "We implement industry-standard security measures:",
        "• SSL/TLS encryption for all data transmission",
        "• Secure password hashing (bcrypt) for account protection",
        "• Regular security updates and vulnerability assessments",
        "• Secure server infrastructure with firewalls and intrusion detection",
        "• Regular backups to prevent data loss",
        "• Employee training on data protection and privacy best practices"
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
              <Shield className="w-3 h-3 mr-1" />
              YOUR PRIVACY MATTERS
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Privacy <span className="text-[#DD2C6C]">Policy</span>
            </h1>
            <p className="text-base text-gray-700 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, protect, and handle your personal information when you use our website and services.
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
              <p className="text-gray-700 leading-relaxed">
                At The Nail Artistry, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices regarding data collection, usage, and protection. By using our website, you agree to the terms described in this policy.
              </p>
            </div>

            {/* Policy Sections */}
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
                              idx === 0 ? 'font-semibold text-gray-900' : 'pl-4'
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

            {/* Policy Updates */}
            <div className="bg-gradient-to-br from-[#DD2C6C]/10 to-pink-50/50 rounded-2xl p-8 border border-[#DD2C6C]/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Updates</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes, we will:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#DD2C6C] mt-1">•</span>
                  <span>Update the "Last updated" date at the top of this policy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DD2C6C] mt-1">•</span>
                  <span>Notify you of significant changes via email or website notice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DD2C6C] mt-1">•</span>
                  <span>Provide a summary of changes for your review</span>
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Your continued use of our website after any changes indicates your acceptance of the updated policy. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
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
