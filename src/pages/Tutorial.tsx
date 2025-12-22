import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Tutorial() {
  usePageTitle('Nail Application Tutorial - Step by Step Guide');
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-secondary border-b">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs items={[{ label: 'Tutorial' }]} />
          <h1 className="text-4xl font-bold">Tutorial</h1>
        </div>
      </div>

      {/* Apply Tutorial */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600"
                alt="How to apply press-on nails"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">How to Apply Press-On Nails?</h2>
              <div className="space-y-4 mb-6">
                <p className="font-semibold">Just 3 Steps - PUSH · BUFF · PRESS</p>
                <p>Voila! You are done!</p>
                <p>20 Nail Sizes for the Perfect Fit</p>
                <p>Stays upto 2-3 weeks</p>
                <p className="text-muted-foreground">
                  Watch the tutorial and Shop from more than 200 designs of Hand Made UV Gel Presson Nails.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Remove Tutorial */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold mb-6">How to Remove Press-On Nails?</h2>
              <div className="space-y-4 mb-6">
                <p className="font-semibold">Just 3 Steps - SOAK · POPOFF · OIL</p>
                <p>Voila! You are done!</p>
                <p>Keep them aside to be reused</p>
                <p>Reusable upto 3-4 times</p>
                <p className="text-muted-foreground">
                  Watch the tutorial and Shop from more than 200 designs of Hand Made UV Gel Presson Nails.
                </p>
              </div>
              <Button size="lg" asChild>
                <Link to="/products">Shop Now</Link>
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600"
                alt="How to remove press-on nails"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Care Tips */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Care Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Before Application</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Clean and dry your natural nails</li>
                <li>• Push back cuticles gently</li>
                <li>• Buff the nail surface lightly</li>
                <li>• Wipe with alcohol pad</li>
              </ul>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="font-semibold mb-3">After Application</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Avoid water for 2 hours</li>
                <li>• Wear gloves for cleaning tasks</li>
                <li>• Apply cuticle oil daily</li>
                <li>• Store properly after removal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
