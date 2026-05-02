const items = [
  '✦ Salon Quality',
  '✦ 2-Min Application',
  '✦ Reusable 15+ Times',
  '✦ Gentle On Natural Nails',
  '✦ Ships Within 24 Hours',
  '✦ 200+ Unique Designs',
  '✦ Lasts 2–3 Weeks',
  '✦ Perfect Fit Guarantee',
];

export const FeaturesSection = () => {
  const doubled = [...items, ...items];

  return (
    <section className="bg-[#DD2C6C] py-3 overflow-hidden">
      <div className="flex animate-marquee-seamless whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-block text-white font-semibold text-sm tracking-wide px-6">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};
