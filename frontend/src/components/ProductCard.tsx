import { useNavigate } from 'react-router-dom';

import type { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <Card
      className="cursor-pointer shadow-xs hover:shadow-md transition-shadow duration-300 py-3"
      onClick={() => handleProductClick(product.id)}
    >
      <CardContent className="px-3">
        {product.images.length ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover rounded-2xl"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-2xl">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <div className="pt-4 px-2">
          <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
          <div className="flex justify-between items-center">
            <span>${product.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
