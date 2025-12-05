import type { CartItem } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

type Props = {
  product: Product | CartItem;
  className?: string;
};

export default function ProductThumb({ className, product }: Props) {
  return (
    <>
      {product.images.length ? (
        <img
          src={product.images[0]}
          alt={product.name}
          className={cn('w-full h-48 object-cover rounded-lg', className)}
        />
      ) : (
        <div
          className={cn(
            'w-full h-48 bg-gray-200 flex items-center justify-center rounded-lg',
            className
          )}
        >
          <span className="text-gray-500">No image</span>
        </div>
      )}
    </>
  );
}
