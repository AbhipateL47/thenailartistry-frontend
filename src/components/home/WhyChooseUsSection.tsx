import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhyChooseUsSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1599206676335-193c82b13c9e?w=600"
              alt="Nail application"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="animate-slide-up">
            <h2 className="text-3xl font-bold mb-6">Why The Nail Artistry?</h2>
            <p className="text-muted-foreground mb-6">
              At The Nail Artistry, we believe everyone deserves beautiful, salon-quality nails
              without the time and expense of regular manicures. Our hand-crafted press-on
              nails combine style, convenience, and quality.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary-foreground" />
                </div>
                <span>Over 200 unique designs to choose from</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary-foreground" />
                </div>
                <span>Stays put for up to 2-3 weeks</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-1 mt-0.5">
                  <ArrowRight className="h-3 w-3 text-primary-foreground" />
                </div>
                <span>20 nail sizes for the perfect fit</span>
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link to="/tutorial">Learn How to Apply</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

