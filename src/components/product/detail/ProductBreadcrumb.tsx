import { Breadcrumbs } from '@/components/common/Breadcrumbs';

interface ProductBreadcrumbProps {
  productName: string;
  category?: string;
}

export const ProductBreadcrumb = ({ productName, category }: ProductBreadcrumbProps) => {
  const items = [
    { label: productName }
  ];

  return <Breadcrumbs items={items} />;
};

