import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Sparkles, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePageTitle } from '@/shared/hooks/usePageTitle';

const stats = [
  { value: '200+', label: 'Unique Designs' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '15+', label: 'Reuses Per Set' },
];

const values = [
  {
    icon: Heart,
    title: 'Made with Passion',
    body: 'Every design is crafted with love by our in-house team of nail artists who live and breathe nail art.',
  },
  {
    icon: Sparkles,
    title: 'Salon-Quality Results',
    body: 'We use the same professional-grade materials as top salons — so your nails look perfect from day one.',
  },
  {
    icon: Shield,
    title: 'Safe & Skin-Friendly',
    body: 'Our press-ons are dermatologist-approved and free from harsh chemicals that damage your natural nails.',
  },
  {
    icon: Leaf,
    title: 'Eco-Conscious',
    body: 'Reusable up to 15 times, our sets reduce nail-salon waste and save you money in the long run.',
  },
];

const team = [
  {
    name: 'Priya Sharma',
    role: 'Founder & Lead Nail Artist',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400',
    quote: 'I started The Nail Artistry because every woman deserves gorgeous nails — without the salon price tag.',
  },
  {
    name: 'Riya Mehta',
    role: 'Head of Design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    quote: 'I draw inspiration from runway trends, street style, and our customers. No two collections are the same.',
  },
  {
    name: 'Neha Patel',
    role: 'Customer Experience Lead',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400',
    quote: 'Our customers are our biggest inspiration. Their photos and reviews shape every new drop we release.',
  },
];

const About = () => {
  usePageTitle('About Us — The Nail Artistry');

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#DD2C6C]/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Our Story</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
            Beauty that fits<br />
            <span className="text-[#DD2C6C]">your life.</span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed">
            The Nail Artistry was born from a simple frustration — why should stunning nails cost ₹2,000 and three hours at a salon? We set out to bring salon-quality press-ons to every woman in India, at a price that makes sense.
          </p>
        </div>
      </section>

      {/* ── Stats band ── */}
      <div className="border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center justify-center py-10 px-4 gap-1">
                <span className="text-3xl md:text-4xl font-black text-[#DD2C6C]">{value}</span>
                <span className="text-white/40 text-xs md:text-sm text-center">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Our Story ── */}
      <section className="py-20 md:py-28 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-[#DD2C6C]/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
                  alt="The Nail Artistry team at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D]/50 to-transparent" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#DD2C6C] text-white rounded-2xl px-5 py-3 text-sm font-bold shadow-xl shadow-[#DD2C6C]/30">
                Est. 2021 · Made in India
              </div>
            </div>

            {/* Text */}
            <div className="order-1 lg:order-2 space-y-5">
              <div>
                <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">How it started</p>
                <h2 className="text-3xl md:text-4xl font-black leading-tight">
                  From a dorm room<br />
                  <span className="text-[#DD2C6C]">to 50,000 customers.</span>
                </h2>
              </div>
              <p className="text-white/55 leading-relaxed">
                In 2021, our founder Priya was a college student who couldn't afford weekly salon visits but refused to compromise on her style. She started hand-making press-on sets for herself — and her hostel-mates went wild for them.
              </p>
              <p className="text-white/55 leading-relaxed">
                What started as pocket-money side hustle quickly turned into a full brand. Today, The Nail Artistry ships to every corner of India, with over 200 designs and a community of 50,000+ nail lovers who share their looks every single day.
              </p>
              <Button
                size="lg"
                asChild
                className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-8 shadow-lg shadow-[#DD2C6C]/25 hover:shadow-[#DD2C6C]/40 transition-all group"
              >
                <Link to="/products">
                  Shop the Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">What we stand for</p>
            <h2 className="text-3xl md:text-4xl font-black">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#DD2C6C]/40 hover:bg-[#DD2C6C]/5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-[#DD2C6C]/15 border border-[#DD2C6C]/30 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-[#DD2C6C]" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 md:py-28 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">The people behind it</p>
            <h2 className="text-3xl md:text-4xl font-black">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map(({ name, role, image, quote }) => (
              <div key={name} className="text-center group">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <div className="absolute inset-0 rounded-full bg-[#DD2C6C]/20 blur-xl group-hover:bg-[#DD2C6C]/30 transition-all" />
                  <img
                    src={image}
                    alt={name}
                    className="relative w-32 h-32 rounded-full object-cover border-2 border-white/10 group-hover:border-[#DD2C6C]/50 transition-all"
                  />
                </div>
                <h3 className="font-bold text-white">{name}</h3>
                <p className="text-[#DD2C6C] text-xs font-medium mb-3">{role}</p>
                <p className="text-white/45 text-sm leading-relaxed italic">"{quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DD2C6C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ready to start?</p>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Find your perfect set.
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
            Over 200 designs waiting for you. Free shipping on orders above ₹799.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-full px-10 py-6 font-bold shadow-lg shadow-[#DD2C6C]/30 hover:shadow-[#DD2C6C]/50 transition-all group"
            >
              <Link to="/products">
                Shop All Designs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent rounded-full px-10 py-6"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
