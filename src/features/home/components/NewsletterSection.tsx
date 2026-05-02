import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const benefits = [
  'Early access to new drops',
  'Exclusive discount codes',
  'Nail art tips & tutorials',
];

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative bg-[#111111] overflow-hidden py-20 md:py-28">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DD2C6C]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <div className="space-y-6">
            <div>
              <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
                Join the Community
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Get first access to<br />
                <span className="text-[#DD2C6C]">new designs.</span>
              </h2>
            </div>
            <p className="text-white/50 text-base leading-relaxed">
              Join 50,000+ nail lovers getting exclusive drops, styling ideas, and offers straight to their inbox.
            </p>
            <ul className="space-y-2.5">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DD2C6C] flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[#DD2C6C]/20 border border-[#DD2C6C]/40 flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-6 w-6 text-[#DD2C6C]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">You're in! 🎉</h3>
                <p className="text-white/50 text-sm">Check your inbox for a welcome surprise.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm font-medium mb-2 block">Email address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#DD2C6C] focus:ring-1 focus:ring-[#DD2C6C] transition-all"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !email}
                  className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-xl py-6 font-bold shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/40 transition-all group disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : (
                    <>
                      Subscribe Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
                <p className="text-white/25 text-xs text-center">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
