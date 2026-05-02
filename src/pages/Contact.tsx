import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { toast } from '@/shared/utils/toast';

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    content: '+91 72259 55292',
    description: 'Call or WhatsApp us',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@thenailartistry.store',
    description: 'We reply within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'India',
    description: 'Shipping nationwide',
  },
];

const faqItems = [
  {
    question: 'How long does shipping take?',
    answer: 'We ship within 24 hours. Standard delivery takes 3–5 business days; express shipping 1–2 business days.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unopened products. Contact us for return instructions.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently we ship within India. International shipping is coming soon!',
  },
];

export default function Contact() {
  usePageTitle('Contact Us - Get in Touch');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.success("Message sent! We'll get back to you soon.");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">

      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#DD2C6C]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            <MessageCircle className="inline w-3 h-3 mr-1" />
            WE'RE HERE TO HELP
          </p>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Get in <span className="text-[#DD2C6C]">Touch</span>
          </h1>
          <p className="text-white/50 max-w-xl mx-auto">
            Have a question or just want to say hi? Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:border-[#DD2C6C]/40 hover:bg-[#DD2C6C]/5 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-5 w-5 text-[#DD2C6C]" />
                  </div>
                  <h3 className="font-bold text-white mb-1">{info.title}</h3>
                  <p className="text-white/80 text-sm font-medium mb-0.5">{info.content}</p>
                  <p className="text-white/40 text-xs">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-12 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-xl font-black text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                      Name <span className="text-[#DD2C6C]">*</span>
                    </Label>
                    <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required
                      className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#DD2C6C]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                      Email <span className="text-[#DD2C6C]">*</span>
                    </Label>
                    <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required
                      className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#DD2C6C]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/70 text-xs font-semibold uppercase tracking-wider">Phone</Label>
                    <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+91 9876543210"
                      className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#DD2C6C]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                      Subject <span className="text-[#DD2C6C]">*</span>
                    </Label>
                    <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this about?" required
                      className="h-11 bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#DD2C6C]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                    Message <span className="text-[#DD2C6C]">*</span>
                  </Label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us more..." required
                    className="min-h-[130px] bg-white/5 border-white/15 text-white placeholder:text-white/25 focus:border-[#DD2C6C] resize-none" />
                </div>

                <Button type="submit" size="lg" disabled={isSubmitting}
                  className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-xl font-bold shadow-lg shadow-[#DD2C6C]/25">
                  {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                </Button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Response time */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#DD2C6C]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Response Time</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    We typically respond within 24 hours on business days. For urgent queries, call us directly.
                  </p>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Quick Answers</h3>
                <div className="space-y-3">
                  {faqItems.map((faq) => (
                    <details key={faq.question} className="group">
                      <summary className="font-medium text-sm text-white/80 cursor-pointer list-none flex items-center justify-between py-2 hover:text-white transition-colors">
                        <span>{faq.question}</span>
                        <span className="text-[#DD2C6C] text-xs group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-sm text-white/50 mt-1.5 pb-2 pl-3 border-l-2 border-[#DD2C6C]/30">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="bg-[#DD2C6C]/10 border border-[#DD2C6C]/20 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-2">Follow Us</h3>
                <p className="text-white/50 text-sm mb-4">Stay updated with new drops and exclusive offers.</p>
                <div className="flex gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-white/70 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white text-sm transition-all">
                    <Instagram className="h-4 w-4" /> Instagram
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/15 rounded-full text-white/70 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white text-sm transition-all">
                    <Youtube className="h-4 w-4" /> YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
