import { useNavigate } from 'react-router-dom';
import { CrownIcon, StarIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AddToCart from './AddToCart';
import ProductThumb from './ProductThumb';
import type { Product } from '@/types';

/**
 * Props for ProductCard component
 */
type ProductCardProps = {
  product: Product;
};

/**
 * Product card component that displays product information and allows interaction
 * Clicking on the card navigates to the product details page, while the add to cart
 * button allows adding the product to the cart without navigation
 */
export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  // Handle navigation to the product details page - includes both ID and slug for SEO
  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}/${product.slug}`);
  };

  return (
    <Card
      className="cursor-pointer shadow-xs hover:shadow-md transition-shadow duration-300 py-3"
      onClick={() => handleProductClick(product)}
    >
      <CardContent className="px-3 relative">
        {product.featured && (
          <Badge className="absolute top-2 left-5 bg-cyan-600">
            <CrownIcon className="fill-current" /> Featured
          </Badge>
        )}
        <ProductThumb product={product} />
        <div className="pt-4 px-2">
          <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
          <div className="flex gap-2 items-center">
            <span className="font-medium">${product.price.toFixed(2)}</span>
            <div className="text-sm line-through text-muted-foreground">
              ${product.compareAtPrice.toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1 items-center">
              <StarIcon className="size-5 fill-primary" />
              <div className="font-medium text-sm text-primary">
                {product.rating}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {product.reviewCount} reviews
            </div>
          </div>
        </div>
        <AddToCart product={product} className="mt-4" size="sm" />
      </CardContent>
    </Card>
  );
}
