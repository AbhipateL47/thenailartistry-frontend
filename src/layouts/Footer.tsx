import { Link } from 'react-router-dom';
import { Instagram, Youtube, Phone, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Shop All', href: '/products' },
  { label: 'Sale', href: '/products?isOnSale=true' },
  { label: 'How to Apply', href: '/tutorial' },
  { label: 'Contact Us', href: '/contact' },
];

const policyLinks = [
  { label: 'Shipping & Returns', href: '/shipping' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
];

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10">
      {/* Statement band */}
      <div className="border-b border-white/8 py-6 overflow-hidden">
        <div className="flex animate-marquee-seamless whitespace-nowrap select-none">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center flex-shrink-0">
              {['The Nail Artistry', '✦', 'Press-On Nails', '✦', 'Salon Quality', '✦', 'At Home', '✦'].map((item, i) => (
                <span
                  key={i}
                  className="inline-block font-black uppercase px-6"
                  style={
                    item === '✦'
                      ? { color: 'rgba(221,44,108,0.18)', fontSize: '1.25rem' }
                      : {
                          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                          letterSpacing: '0.12em',
                          WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                          color: 'transparent',
                        }
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main grid */}
      <div className="container mx-auto px-4 py-10 md:py-14">

        {/* Brand — full width on mobile, one col on desktop */}
        <div className="mb-8 md:mb-0 md:hidden">
          <Link to="/" className="inline-block mb-3">
            <span className="text-lg font-black text-white">The Nail Artistry</span>
          </Link>
          <p className="text-white/38 text-sm leading-relaxed mb-4 max-w-xs">
            Premium press-on nails with salon-quality results. Reusable, stylish, and perfect for every occasion.
          </p>
          <div className="flex gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white transition-all">
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white transition-all">
              <Youtube className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Mobile: 2-col links grid */}
        <div className="grid grid-cols-2 gap-6 md:hidden mb-8">
          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-white/70 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-widest">Support</h4>
            <ul className="space-y-2">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-white/70 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile: contact row */}
        <div className="md:hidden border-t border-white/8 pt-6 flex flex-col gap-2.5">
          <a href="tel:+917225955292" className="flex items-center gap-2 text-white/40 text-sm">
            <Phone className="h-3.5 w-3.5 text-[#DD2C6C] flex-shrink-0" />
            +91 72259 55292
          </a>
          <a href="mailto:info@thenailartistry.store" className="flex items-center gap-2 text-white/40 text-sm">
            <Mail className="h-3.5 w-3.5 text-[#DD2C6C] flex-shrink-0" />
            info@thenailartistry.store
          </a>
        </div>

        {/* Desktop: 4-col grid (unchanged) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-black text-white">The Nail Artistry</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Premium press-on nails with salon-quality results. Reusable, stylish, and perfect for every occasion.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white transition-all">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] hover:text-white transition-all">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-white/80 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2.5">
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-white/40 text-sm hover:text-white/80 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Get in Touch</h4>
            <div className="space-y-3">
              <a href="tel:+917225955292" className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors">
                <Phone className="h-3.5 w-3.5 text-[#DD2C6C]" />
                +91 72259 55292
              </a>
              <a href="mailto:info@thenailartistry.store" className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/70 transition-colors">
                <Mail className="h-3.5 w-3.5 text-[#DD2C6C]" />
                info@thenailartistry.store
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Secure Checkout', 'Easy Returns', 'Fast Shipping'].map((t) => (
                <span key={t} className="text-[10px] text-white/30 border border-white/10 rounded-full px-2.5 py-1">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 pb-20 md:pb-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/25">
          <span>© {year} The Nail Artistry. All Rights Reserved.</span>
          <span>Made with ♥ in India</span>
        </div>
      </div>
    </footer>
  );
};
