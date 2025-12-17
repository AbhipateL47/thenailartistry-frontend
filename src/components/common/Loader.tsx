import { cn } from '@/lib/utils';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader = ({ size = 'md', className }: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size],
          className
        )}
      />
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader size="lg" />
    </div>
  );
};
