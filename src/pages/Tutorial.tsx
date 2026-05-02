import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle2, Lightbulb, ShoppingBag, Play, ArrowDown, Star } from 'lucide-react';
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { productService, Product } from '@/features/products/services/product.service';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/shared/utils/toast';
import { cn } from '@/shared/utils/cn';

export default function Tutorial() {
  usePageTitle('Nail Application Tutorial - Step by Step Guide');
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { addItem, openDrawer } = useCart();
  const [toolkitIndex, setToolkitIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productService.getFeaturedProducts();
        setFeaturedProducts(response.slice(0, 3)); // Get top 3 featured products
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const price = productService.getLowestPrice(product);
    addItem({
      id: product._id,
      productId: product._id,
      slug: product.slug,
      name: product.name,
      price: price,
      image: product.primaryImage,
      quantity: 1,
    });
    // Toast is handled in CartContext.addItem
    openDrawer();
  };

  const toolkitItems = [
    {
      name: 'Dual-Grit File',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      description: 'Essential for shaping and buffing the natural nail bed for grip.',
    },
    {
      name: 'Cuticle Pusher',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
      description: 'Gently push back cuticles to create a clean canvas for application.',
    },
    {
      name: 'Alcohol Pad',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400',
      description: 'Removes oils and dust. Critical for long-lasting wear.',
    },
    {
      name: 'Super Bond Glue',
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400',
      description: 'Our signature formula when applied correctly ensures 2-3 weeks of perfect wear.',
    },
  ];

  const processSteps = [
    {
      number: 1,
      title: 'The Clean Slate',
      isCritical: true,
      description: 'Wash your hands thoroughly. Use the wooden stick to gently push back your cuticles. Then, lightly buff the surface of your natural nails to remove shine.',
      proTip: "Do not use lotion or cuticle oil before this step! Oil is the enemy of adhesion.",
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
    },
    {
      number: 2,
      title: 'Measure Twice',
      description: 'Test the fit of each press-on against your natural nails. The perfect fit covers side-to-side without touching your skin.',
      checklist: [
        'If in between sizes, choose the smaller one.',
        'File the sides if necessary for a custom contour.',
      ],
      image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600',
    },
    {
      number: 3,
      title: 'The Glue Down',
      description: 'Apply a small dot of glue to your natural nail and a drop to the back of the press-on. Align the press-on at a 45-degree angle near the cuticle, then press down slowly to avoid air bubbles. Hold firmly for 15-20 seconds.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <Badge className="bg-[#DD2C6C]/10 text-[#DD2C6C] border-[#DD2C6C]/20 hover:bg-[#DD2C6C]/20">
                <Play className="w-3 h-3 mr-1" />
                VIDEO GUIDE AVAILABLE
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Master{' '}
                <span className="text-[#DD2C6C]">The Press.</span>
              </h1>

              <p className="text-lg text-white/55 max-w-xl">
                Salon quality in 10 minutes. Forget everything you know about glue-ons. Here is the art of the perfect, lasting application.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white">
                  Start Tutorial
                  <ArrowDown className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent">
                  <Link to="/products">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shop Kits
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800"
                  alt="Press-on nails application"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <span className="text-sm font-semibold text-white">
                    10 Minutes to apply
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Toolkit Section */}
      <section className="py-16 bg-[#111111]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">The Toolkit</h2>
              <p className="text-white/55 max-w-2xl mx-auto">
                Every set comes with a pro-grade toolkit to ensure a seamless fit. No extra runs to the store needed.
              </p>
            </div>

            {/* Toolkit Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${toolkitIndex * 100}%)` }}
                >
                  {toolkitItems.map((item, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                          <div className="relative h-64 rounded-xl overflow-hidden bg-white/5">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.name}</h3>
                            <p className="text-white/55 text-lg">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setToolkitIndex((prev) => (prev > 0 ? prev - 1 : toolkitItems.length - 1))}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/10 border border-white/15 rounded-full p-2 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setToolkitIndex((prev) => (prev < toolkitItems.length - 1 ? prev + 1 : 0))}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/10 border border-white/15 rounded-full p-2 hover:bg-[#DD2C6C] hover:border-[#DD2C6C] transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {toolkitItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setToolkitIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all',
                    index === toolkitIndex ? 'bg-[#DD2C6C] w-8' : 'bg-white/20'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase">The Process</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Let's get applied.</h2>
            </div>

            <div className="space-y-16">
              {processSteps.map((step, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left - Content */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#DD2C6C] text-white flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        {step.isCritical && (
                          <Badge className="bg-green-500/15 text-green-400 border-green-500/30 mt-1">
                            CRITICAL STEP
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-white/55 text-lg leading-relaxed">{step.description}</p>

                    {step.proTip && (
                      <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-amber-300 mb-1">Pro Tip:</p>
                            <p className="text-amber-200/70 text-sm">{step.proTip}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.checklist && (
                      <ul className="space-y-2">
                        {step.checklist.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-[#DD2C6C] mt-0.5 flex-shrink-0" />
                            <span className="text-white/55">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right - Image */}
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
              ))}

              {/* Completion */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-3 bg-[#DD2C6C]/10 rounded-full px-6 py-3">
                  <CheckCircle2 className="w-6 h-6 text-[#DD2C6C]" />
                  <span className="text-lg font-semibold text-white">You're done! Slay away.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-[#111111]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase mb-3">Best Seller</p>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Featured in Tutorial</h2>
                <p className="text-white/50">Shop the products shown in this tutorial</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProducts.map((product) => {
                  const basePrice = productService.getLowestPrice(product);
                  const isOnSale = product.isOnSale === true && typeof product.salePercent === 'number' && product.salePercent > 0;
                  const finalPrice = isOnSale
                    ? Math.round(basePrice - (basePrice * product.salePercent) / 100)
                    : basePrice;

                  return (
                    <div key={product._id} className="group bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#DD2C6C]/40 transition-all">
                      <Link to={`/products/${product.slug}`} className="block mb-4">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 mb-4 border border-white/10">
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-bold text-white text-base mb-1 group-hover:text-[#DD2C6C] transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-white/40 mb-3">As seen in the tutorial</p>
                        <div className="flex items-center gap-2 mb-2">
                          {isOnSale ? (
                            <>
                              <span className="text-sm text-white/40 line-through">{formatCurrency(basePrice)}</span>
                              <span className="text-xl font-bold text-white">{formatCurrency(finalPrice)}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-white">{formatCurrency(basePrice)}</span>
                          )}
                        </div>
                        {product.ratingAvg > 0 && (
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={cn('w-3.5 h-3.5', i < Math.floor(product.ratingAvg) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20')} />
                            ))}
                          </div>
                        )}
                      </Link>
                      <Button
                        className="w-full bg-[#DD2C6C] hover:bg-[#c42460] text-white rounded-xl shadow-lg shadow-[#DD2C6C]/20"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Bag
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Troubleshooting Section */}
      <section className="py-16 bg-[#0D0D0D]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-8 text-center">Troubleshooting</h2>
            <div className="space-y-3">
              <details className="bg-white/5 border border-white/10 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                  Nails popping off?
                  <span className="text-[#DD2C6C] text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 text-white/55 text-sm space-y-2 pl-3 border-l-2 border-[#DD2C6C]/30">
                  <p>This usually happens when the nail bed wasn't properly prepared. Make sure to:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Thoroughly clean and buff your natural nails</li>
                    <li>Avoid using lotion or oils before application</li>
                    <li>Apply glue to both the nail and the press-on</li>
                    <li>Hold firmly for 15–20 seconds after application</li>
                  </ul>
                </div>
              </details>

              <details className="bg-white/5 border border-white/10 rounded-xl p-5 group">
                <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                  Air bubbles?
                  <span className="text-[#DD2C6C] text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="mt-3 text-white/55 text-sm space-y-2 pl-3 border-l-2 border-[#DD2C6C]/30">
                  <p>Air bubbles can be prevented by:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Applying the press-on at a 45-degree angle</li>
                    <li>Pressing down slowly from cuticle to tip</li>
                    <li>Using the right amount of glue (not too much, not too little)</li>
                    <li>Ensuring the nail bed is completely dry before application</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
