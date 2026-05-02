import { useNavigate } from "react-router-dom";
import { usePageTitle } from '@/shared/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home } from 'lucide-react';

const NotFound = () => {
  usePageTitle('Page Not Found - 404');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#DD2C6C]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-[#DD2C6C]/10 rounded-3xl blur-3xl" />
            <div className="relative w-full h-[380px] rounded-3xl overflow-hidden border border-white/10">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaZAX79MxaBTPPqDH24ZcVET6Nk9J9vRAvTzgbGpyTQkJ86AhhxszIwlWQPUykAAnHgoeT6w7n5BmZnuheKA9GL2teQ6lr4835gq2STcVc2YtVD7o0yeSCkCooJR90Z7yL_YlkOPg-otwWQ-rm5FqJMQo2qFQ8FXAgNmzbQjHLxPFuILnx1NpS3lE0ToGFC43cXUC8GAK9YEeUEwbg07YAuRO33gAJR9oGTPlfcw21oaAMnkCZyyYRv75iME09z4MgxKPZwxjQ6zX2"
                alt="Beautiful nail art"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D0D]/60 to-transparent" />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 lg:order-1 space-y-6">
            <p className="text-[#DD2C6C] text-xs font-semibold tracking-[0.2em] uppercase">Error 404</p>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Page Not<br />Found
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              We can't seem to find the page you're looking for. The link might be broken, or the page may have moved.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate('/')}
                className="bg-[#DD2C6C] hover:bg-[#c42460] text-white px-8 py-6 font-bold rounded-full shadow-lg shadow-[#DD2C6C]/25 group"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
              <Button
                onClick={() => navigate('/products')}
                variant="outline"
                className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white bg-transparent rounded-full px-8 py-6 group"
              >
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
