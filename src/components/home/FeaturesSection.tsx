import { Sparkles, Clock, RefreshCw, Heart, Shield, Truck, Star, Check, Gift, Zap, LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { featureService, Feature } from '@/services/featureService';

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  clock: Clock,
  refresh: RefreshCw,
  heart: Heart,
  shield: Shield,
  truck: Truck,
  star: Star,
  check: Check,
  gift: Gift,
  zap: Zap,
};

// Default features - fallback if API fails
const defaultFeatures = [
  { _id: '1', icon: 'sparkles', title: 'Salon Quality', description: 'Professional results at home', order: 1, isActive: true },
  { _id: '2', icon: 'clock', title: 'Quick Application', description: 'Ready in just 2 minutes', order: 2, isActive: true },
  { _id: '3', icon: 'refresh', title: 'Reusable 15+ Times', description: 'Eco-friendly & cost effective', order: 3, isActive: true },
  { _id: '4', icon: 'heart', title: 'Gentle Formula', description: 'Safe for natural nails', order: 4, isActive: true },
  { _id: '5', icon: 'shield', title: 'Long Lasting', description: 'Stays perfect for 2+ weeks', order: 5, isActive: true },
  { _id: '6', icon: 'truck', title: 'Fast Delivery', description: 'Ships within 24 hours', order: 6, isActive: true },
];

interface FeaturesSectionProps {
  columns?: 3 | 4 | 6;
  showBackground?: boolean;
  maxFeatures?: number;
}

export const FeaturesSection = ({ 
  columns = 6,
  showBackground = true,
  maxFeatures,
}: FeaturesSectionProps) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (hasFetched) return;

    const fetchFeatures = async () => {
      try {
        const data = await featureService.getFeatures();
        setFeatures(data);
        setError(false);
      } catch (err) {
        console.error('Failed to fetch features:', err);
        setError(true);
        setFeatures(defaultFeatures);
      } finally {
        setLoading(false);
        setHasFetched(true);
      }
    };

    fetchFeatures();
  }, [hasFetched]);

  // Limit features based on maxFeatures prop only
  const displayFeatures = maxFeatures 
    ? features.slice(0, maxFeatures) 
    : features;
  
  const gridCols = {
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    6: 'md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <section className={`py-16 ${showBackground ? 'bg-[#FDF8F8]' : ''}`}>
      <div className="container mx-auto px-5">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-[#DD2C6C] text-sm font-semibold tracking-wider uppercase">Why Choose Us</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mt-2">
            The Perfect Press-On Experience
          </h2>
        </div>

        {/* Features grid */}
        <div className={`grid grid-cols-2 ${gridCols[columns]} gap-6 md:gap-8`}>
          {displayFeatures.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Sparkles;
            
            return (
              <div
                key={feature._id}
                className={`group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-[#DD2C6C]/5 ${
                  loading ? 'animate-pulse' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#DD2C6C]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#DD2C6C]/20 group-hover:scale-110 transition-all">
                  <IconComponent className="w-6 h-6 text-[#DD2C6C]" />
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-[#1a1a1a] mb-1 group-hover:text-[#DD2C6C] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#1a1a1a]/60">
                  {feature.description}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#DD2C6C] rounded-full group-hover:w-12 transition-all duration-300" />
              </div>
            );
          })}
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
