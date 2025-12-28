import { Button } from '@/components/ui/button';
import { Mail, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // TODO: Implement newsletter subscription API
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('');
      // Show success toast
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#FDF8F8] via-pink-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#DD2C6C]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[#DD2C6C] text-sm font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Stay Connected</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Join Our Nail Art Community
          </h2>
          <p className="text-[#1a1a1a]/70 max-w-2xl mx-auto text-base md:text-lg">
            Get exclusive nail art inspiration, early access to new designs, and special offers
            delivered straight to your inbox
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 bg-white rounded-2xl p-2 shadow-lg border border-[#DD2C6C]/10">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1a1a]/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#DD2C6C]/20 text-[#1a1a1a] placeholder:text-[#1a1a1a]/40 bg-transparent"
                  required
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting || !email}
                className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>

          {/* Benefits List */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-[#1a1a1a]/60">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C]"></div>
              <span>Weekly inspiration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C]"></div>
              <span>Exclusive offers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C]"></div>
              <span>New design alerts</span>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="w-12 h-px bg-[#DD2C6C]/20" />
          <div className="w-2 h-2 rounded-full bg-[#DD2C6C]/30" />
          <div className="w-12 h-px bg-[#DD2C6C]/20" />
        </div>
      </div>
    </section>
  );
};
