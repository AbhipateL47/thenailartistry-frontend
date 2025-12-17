import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src="/logo_light_1.png" 
        alt="The Nail Artistry" 
        className={`object-contain ${className || 'h-12 w-auto'}`}
        onError={(e) => {
          // Fallback to text if image doesn't exist
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent && !parent.querySelector('.logo-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'logo-fallback text-2xl font-bold';
            fallback.style.color = '#DD2C6C';
            fallback.textContent = 'The Nail Artistry';
            parent.appendChild(fallback);
          }
        }}
      />
    </Link>
  );
};

