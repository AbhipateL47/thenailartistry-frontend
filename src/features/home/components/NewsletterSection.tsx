import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { newsletterService } from '../services/newsletter.service';

const benefits = [
  'Early access to new drops',
  'Exclusive discount codes',
  'Nail art tips & tutorials',
];

export const NewsletterSection = () => {
  const [email, setEmail]           = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError]           = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setError('');
    try {
      await newsletterService.subscribe(email);
      setSubmitted(true);
      setEmail('');
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[#0D0D0D] overflow-hidden">

      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#DD2C6C]/35 to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(221,44,108,0.1) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Decorative corner rings */}
      <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-[#DD2C6C]/8 pointer-events-none" />
      <div className="absolute top-12 left-12 w-12 h-12 rounded-full border border-[#DD2C6C]/10 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full border border-[#DD2C6C]/8 pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-12 h-12 rounded-full border border-[#DD2C6C]/10 pointer-events-none" />

      <div className="relative py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">

            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2.5 text-[#DD2C6C] text-[11px] font-semibold tracking-[0.28em] uppercase mb-6">
              <span className="h-px w-5 bg-[#DD2C6C]/50 inline-block" />
              Join 50,000+ nail lovers
              <span className="h-px w-5 bg-[#DD2C6C]/50 inline-block" />
            </p>

            {/* Headline */}
            <h2
              className="font-black leading-[0.9] tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)' }}
            >
              <span className="text-white">Get first access</span><br />
              <span style={{ WebkitTextStroke: '2px #DD2C6C', color: 'transparent' }}>
                to new designs.
              </span>
            </h2>

            <p className="text-white/40 text-sm md:text-[15px] leading-relaxed mb-8">
              Early drops, exclusive codes, and nail art inspiration —{' '}
              straight to your inbox.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {benefits.map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-2 text-[11px] text-white/45 px-3.5 py-1.5 rounded-full border border-white/[0.09]"
                >
                  <span className="w-1 h-1 rounded-full bg-[#DD2C6C] flex-shrink-0" />
                  {b}
                </span>
              ))}
            </div>

            {/* Form / Success state */}
            {submitted ? (
              <div className="py-6">
                <div className="w-14 h-14 rounded-full bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center mx-auto mb-4">
                  <Check className="h-6 w-6 text-[#DD2C6C]" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">You're in!</h3>
                <p className="text-white/40 text-sm">Welcome to the community. Check your inbox.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/25 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white/[0.05] border border-white/[0.10] text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-[#DD2C6C]/60 focus:ring-1 focus:ring-[#DD2C6C]/30 transition-all"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !email}
                  className="group bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-7 py-3.5 font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/40 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    'Joining…'
                  ) : (
                    <>
                      Join Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {error && (
              <p className="text-[#DD2C6C] text-xs mt-3">{error}</p>
            )}
            <p className="text-white/20 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>

          </div>
        </div>
      </div>

      {/* Bottom gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

    </section>
  );
};
