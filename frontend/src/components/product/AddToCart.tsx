import { useCart } from '@/context/CartContext';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types';
import { MinusIcon, PlusIcon } from 'lucide-react';

type Props = {
  product: Product;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
};

export default function AddToCart({
  className,
  product,
  size = 'default',
}: Props) {
  const { addToCart, updateQuantity, cart } = useCart();

  const productAdded = cart.items.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className={className} onClick={(e) => e.stopPropagation()}>
      {productAdded ? (
        <ButtonGroup className="w-full">
          <Button
            variant="outline"
            size={size === 'default' ? 'icon' : `icon-${size}`}
            onClick={() =>
              updateQuantity(productAdded.id, productAdded.quantity - 1)
            }
          >
            <MinusIcon />
          </Button>
          <Button variant="outline" size={size} className="flex-1">
            {productAdded.quantity} added to cart
          </Button>
          <Button
            variant="outline"
            size={size === 'default' ? 'icon' : `icon-${size}`}
            onClick={handleAddToCart}
          >
            <PlusIcon />
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          size={size}
          onClick={handleAddToCart}
          className="w-full hover:scale-105 transition-transform duration-300"
        >
          Add to cart
        </Button>
      )}
    </div>
  );
}
