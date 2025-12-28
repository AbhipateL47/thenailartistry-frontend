import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePageTitle } from '@/hooks/usePageTitle';
import { toast } from 'react-hot-toast';

export default function Contact() {
  usePageTitle('Contact Us - Get in Touch');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement contact form API
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.success('Message sent successfully! We\'ll get back to you soon.');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 7225955292',
      description: 'Call us anytime',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@thenailartistry.com',
      description: 'Send us an email',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'India',
      description: 'We ship nationwide',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const faqItems = [
    {
      question: 'How long does shipping take?',
      answer: 'We typically ship within 24 hours. Standard delivery takes 3-5 business days, while express shipping takes 1-2 business days.',
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for unopened products. Please contact us for return instructions.',
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship within India. International shipping options are coming soon!',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 bg-gradient-to-br from-[#FDF8F8] via-pink-50/50 to-purple-50/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#DD2C6C]/10 text-[#DD2C6C] border-[#DD2C6C]/20 mb-3">
              <MessageCircle className="w-3 h-3 mr-1" />
              WE'RE HERE TO HELP
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Get in <span className="text-[#DD2C6C]">Touch</span>
            </h1>
            <p className="text-base text-[#1a1a1a]/70 max-w-2xl mx-auto mb-2">
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            <p className="text-sm text-[#1a1a1a]/60">
              You may also find answers in our <a href="/faq" className="text-[#DD2C6C] hover:underline font-medium">FAQs</a>
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all text-center group"
                >
                  <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                  <p className="text-[#1a1a1a] font-semibold mb-1">{info.content}</p>
                  <p className="text-sm text-[#1a1a1a]/60">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-[#FDF8F8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left - Form */}
            <div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        Name <span className="text-[#DD2C6C]">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                        className="h-12 border-gray-200 focus:border-[#DD2C6C] focus:ring-[#DD2C6C]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email <span className="text-[#DD2C6C]">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="h-12 border-gray-200 focus:border-[#DD2C6C] focus:ring-[#DD2C6C]/20"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 1234567890"
                        className="h-12 border-gray-200 focus:border-[#DD2C6C] focus:ring-[#DD2C6C]/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold">
                        Subject <span className="text-[#DD2C6C]">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                        className="h-12 border-gray-200 focus:border-[#DD2C6C] focus:ring-[#DD2C6C]/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-semibold">
                      Message <span className="text-[#DD2C6C]">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[150px] border-gray-200 focus:border-[#DD2C6C] focus:ring-[#DD2C6C]/20 resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white h-12 font-semibold"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right - Info & FAQ */}
            <div className="space-y-8">
              {/* Response Time */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="bg-[#DD2C6C]/10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#DD2C6C]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Response Time</h3>
                    <p className="text-[#1a1a1a]/70 text-sm">
                      We typically respond within 24 hours during business days. For urgent matters, please call us directly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-lg mb-4">Quick Answers</h3>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="font-semibold text-sm cursor-pointer list-none flex items-center justify-between py-2 hover:text-[#DD2C6C] transition-colors">
                        <span>{faq.question}</span>
                        <span className="text-[#DD2C6C] group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-sm text-[#1a1a1a]/70 mt-2 pl-4 border-l-2 border-[#DD2C6C]/20">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-[#DD2C6C]/10 to-pink-50/50 rounded-2xl p-6 border border-[#DD2C6C]/20">
                <h3 className="font-bold text-lg mb-3">Follow Us</h3>
                <p className="text-sm text-[#1a1a1a]/70 mb-4">
                  Stay connected with us on social media for the latest updates, new designs, and exclusive offers.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
