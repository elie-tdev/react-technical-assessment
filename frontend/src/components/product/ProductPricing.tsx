import type { Product } from '@/types';

type Props = {
  product: Product;
};

/**
 * Component to display product pricing information including current price and compare at price
 */
export default function ProductPricing({ product }: Props) {
  return (
    <div className="flex gap-2 items-center">
      <span className="font-medium">${product.price.toFixed(2)}</span>
      <div className="text-sm line-through text-muted-foreground">
        ${product.compareAtPrice.toFixed(2)}
      </div>
    </div>
  );
}
