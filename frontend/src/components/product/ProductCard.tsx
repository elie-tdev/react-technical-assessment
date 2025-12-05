import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import AddToCart from './AddToCart';
import ProductThumb from './ProductThumb';
import FeaturedBadge from './FeaturedBadge';
import ProductPricing from './ProductPricing';
import ProductRating from './ProductRating';
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
        <FeaturedBadge product={product} />
        <ProductThumb product={product} />
        <div className="pt-4 px-2">
          <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
          <ProductPricing product={product} />
          <ProductRating product={product} />
        </div>
        <AddToCart product={product} className="mt-4" size="sm" />
      </CardContent>
    </Card>
  );
}
