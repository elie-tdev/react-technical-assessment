import { CrownIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

type Props = {
  product: Product;
};

/**
 * Component to display the featured badge for products
 */
export default function FeaturedBadge({ product }: Props) {
  if (!product.featured) {
    return null;
  }

  return (
    <Badge className="absolute top-2 left-5 bg-cyan-600">
      <CrownIcon className="fill-current" /> Featured
    </Badge>
  );
}
