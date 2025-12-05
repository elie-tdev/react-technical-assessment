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
 * Provides intuitive controls for adjusting item quantities in the cart.
 */
export default function QuantityButtons({ item }: Props) {
  const { updateQuantity } = useCart();

  return (
    <ButtonGroup role="group" aria-label="Quantity adjustment buttons">
      {/* Button to decrease quantity, disabled when item quantity is 1 or less */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        aria-label={`Decrease quantity of ${item.name} by 1`}
      >
        <MinusIcon aria-hidden="true" />
      </Button>
      {/* Display current quantity as a disabled button */}
      <Button
        variant="outline"
        size="icon-sm"
        disabled
        aria-label={`${item.name} quantity: ${item.quantity}`}
        className="min-w-[32px] justify-center"
      >
        {item.quantity}
      </Button>
      {/* Button to increase quantity */}
      <Button
        variant="outline"
        size="icon-sm"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        aria-label={`Increase quantity of ${item.name} by 1`}
      >
        <PlusIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  );
}
