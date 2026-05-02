import React from "react";
import { Shield, Lock, Eye, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { usePageTitle } from "@/shared/hooks/usePageTitle";

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
      "• Communication records when you contact our customer support",
    ],
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
      "• We only receive confirmation of successful payments, not payment details",
    ],
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
      "You can manage cookie preferences through your browser settings",
    ],
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
      "We do not sell, rent, or share your personal data with third parties for marketing purposes",
    ],
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
      "• Regular security audits ensure compliance with data protection standards",
    ],
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
      "• Employee training on data protection and privacy best practices",
    ],
  },
];

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy - Your Data Protection');

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero */}
      <section className="relative pt-20 pb-14 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#DD2C6C]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <Shield className="inline w-3 h-3 mr-1" />
            Your Privacy Matters
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Privacy <span className="text-[#DD2C6C]">Policy</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto mb-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
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
              <p className="text-white/65 leading-relaxed">
                At The Nail Artistry, we are committed to protecting your privacy and ensuring the security of your personal information. By using our website, you agree to the terms described in this policy.
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
                          <li key={idx} className={`text-sm leading-relaxed ${idx === 0 ? 'font-semibold text-white/80' : 'text-white/55 pl-2'}`}>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Policy updates */}
            <div className="bg-[#DD2C6C]/8 border border-[#DD2C6C]/25 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-3">Policy Updates</h2>
              <p className="text-white/55 text-sm leading-relaxed mb-3">
                We may update this Privacy Policy from time to time. When we make changes, we will:
              </p>
              <ul className="space-y-1.5 text-sm text-white/55">
                <li className="flex items-start gap-2"><span className="text-[#DD2C6C] mt-0.5">•</span><span>Update the "Last updated" date at the top of this policy</span></li>
                <li className="flex items-start gap-2"><span className="text-[#DD2C6C] mt-0.5">•</span><span>Notify you of significant changes via email or website notice</span></li>
                <li className="flex items-start gap-2"><span className="text-[#DD2C6C] mt-0.5">•</span><span>Provide a summary of changes for your review</span></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h2 className="text-lg font-bold text-white mb-3">Questions About Privacy?</h2>
              <p className="text-white/55 text-sm mb-3">Contact us if you have any questions or requests regarding this policy:</p>
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
