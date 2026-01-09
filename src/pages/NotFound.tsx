import { useNavigate } from "react-router-dom";
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Home, Sparkles } from 'lucide-react';

const NotFound = () => {
  usePageTitle('Page Not Found - 404');
  const navigate = useNavigate();

  const popularCategories = [
    { name: 'Gel Polish', href: '/products?category=gel-polish' },
    { name: 'Nail Art', href: '/products?category=nail-art' },
    { name: 'Tools', href: '/products?category=tools' },
    { name: 'Kits', href: '/products?category=kits' },
  ];

  const handleCategoryClick = (href: string) => {
    navigate(href);
  };

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Right Section - Image (appears first on mobile) */}
          <div className="relative w-full order-1 lg:order-2">
            <div className="relative w-full h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl overflow-hidden bg-black shadow-2xl">
              {/* Image of hand holding flowers */}
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZAX79MxaBTPPqDH24ZcVET6Nk9J9vRAvTzgbGpyTQkJ86AhhxszIwlWQPUykAAnHgoeT6w7n5BmZnuheKA9GL2teQ6lr4835gq2STcVc2YtVD7o0yeSCkCooJR90Z7yL_YlkOPg-otwWQ-rm5FqJMQo2qFQ8FXAgNmzbQjHLxPFuILnx1NpS3lE0ToGFC43cXUC8GAK9YEeUEwbg07YAuRO33gAJR9oGTPlfcw21oaAMnkCZyyYRv75iME09z4MgxKPZwxjQ6zX2"
                alt="Hand holding white daisy flowers with beautifully manicured nails"
                className="w-full h-full object-cover rounded-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Left Section - Error Message & Actions (appears second on mobile) */}
          <div className="space-y-8 order-2 lg:order-1">
            {/* ERROR 404 Badge */}
            <div>
              <span className="text-[#DD2C6C] text-sm font-medium tracking-wide opacity-80">
                ERROR 404
              </span>
            </div>

            {/* Page Not Found Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Page Not Found
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                We can't seem to find the page you are looking for. It looks like the specific shade is out of stock or the link is broken.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-3">
              <Button
                onClick={() => navigate('/')}
                className="bg-[#DD2C6C] hover:bg-[#DD2C6C]/90 text-white px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex-1"
              >
                Back to Home
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-1 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-4 sm:px-8 py-4 sm:py-6 text-sm sm:text-base font-semibold rounded-lg transition-all flex-1"
              >
                Shop New Arrivals
              </Button>
            </div>

            {/* Popular Categories */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Popular Categories
              </h3>
              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
                {popularCategories.map((category, index) => (
                  <Button
                    key={index}
                    onClick={() => handleCategoryClick(category.href)}
                    variant="outline"
                    className="rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#DD2C6C] hover:text-[#DD2C6C] px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap flex-shrink-0"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
