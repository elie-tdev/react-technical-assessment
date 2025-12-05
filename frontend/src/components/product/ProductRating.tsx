import { StarIcon } from 'lucide-react';
import type { Product } from '@/types';

type Props = {
  product: Product;
};

/**
 * Component to display product rating and review count
 */
export default function ProductRating({ product }: Props) {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex gap-1 items-center">
        <StarIcon className="size-5 fill-primary" />
        <div className="font-medium text-sm text-primary">{product.rating}</div>
      </div>
      <div className="text-sm text-muted-foreground">
        {product.reviewCount} reviews
      </div>
    </div>
  );
}
