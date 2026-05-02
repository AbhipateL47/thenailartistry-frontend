import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export interface BreadcrumbItemConfig {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemConfig[];
  showHome?: boolean;
}

export const Breadcrumbs = ({ items, showHome = true }: BreadcrumbsProps) => {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {showHome && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="flex items-center gap-1 text-white/40 hover:text-[#DD2C6C] transition-colors">
                  <span>Home</span>
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-4 h-4 text-white/25" />
            </BreadcrumbSeparator>
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <BreadcrumbItem key={index}>
              {isLast ? (
                <BreadcrumbPage className="text-white/80 font-medium">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.href || '#'}
                      className="text-white/40 hover:text-[#DD2C6C] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator>
                    <ChevronRight className="w-4 h-4 text-white/25" />
                  </BreadcrumbSeparator>
                </>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
