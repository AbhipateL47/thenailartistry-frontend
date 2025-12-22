import { Button } from '@/components/ui/button';

export const NewsletterSection = () => {
  return (
    <section className="py-16 bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Subscribe for nail art inspiration, exclusive offers, and be the first to know
          about new designs
        </p>
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email..."
            className="flex-1 px-4 py-3 rounded-lg text-foreground"
          />
          <Button size="lg" variant="secondary" className="whitespace-nowrap">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

