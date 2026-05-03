import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const Logo = ({ className = '', variant = 'dark' }: LogoProps) => {
  const src = variant === 'dark'
    ? '/logos/logo-wordmark-dark.svg'
    : '/logos/logo-wordmark-light.svg';

  return (
    <Link to="/" className={`flex items-center shrink-0 ${className}`} aria-label="The Nail Artistry">
      <img src={src} alt="The Nail Artistry" className="h-14 md:h-12 w-auto" />
    </Link>
  );
};
