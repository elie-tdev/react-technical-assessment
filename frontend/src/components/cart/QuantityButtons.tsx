import { MinusIcon, PlusIcon } from 'lucide-react';

import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/context/CartContext';

type Props = {
  item: CartItem;
};

/**
 * QuantityButtons component allows users to increase or decrease the quantity
 * of a cart item with accessible buttons and proper validation.
 */
export default function QuantityButtons({ item }: Props) {
  const { updateQuantity } = useCart();

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </Button>
      <Button variant="outline" size="icon-sm" disabled aria-label={`Quantity: ${item.quantity}`}>
        {item.quantity}
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </Button>
    </ButtonGroup>
  );
}
