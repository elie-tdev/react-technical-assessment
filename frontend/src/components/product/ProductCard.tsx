import { useNavigate } from 'react-router-dom';

import { Card, CardContent } from '@/components/ui/card';
import AddToCart from './AddToCart';
import ProductThumb from './ProductThumb';
import type { Product } from '@/types';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  // Handle navigation to the product details page
  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      className="cursor-pointer shadow-xs hover:shadow-md transition-shadow duration-300 py-3"
      onClick={() => handleProductClick(product.id)}
    >
      <CardContent className="px-3">
        <ProductThumb product={product} />
        <div className="pt-4 px-2">
          <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
          <div className="flex gap-2 items-center">
            <span className="font-medium">${product.price.toFixed(2)}</span>
            <div className="text-sm line-through">
              ${product.compareAtPrice.toFixed(2)}
            </div>
          </div>
        </div>
        <AddToCart product={product} className="mt-4" size="sm" />
      </CardContent>
    </Card>
  );
}
