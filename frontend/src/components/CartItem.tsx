import { MinusIcon, PlusIcon } from 'lucide-react';

import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/context/CartContext';
import ProductThumb from './ProductThumb';

type Props = {
  item: CartItem;
};

export default function CartListItem({ item }: Props) {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <li className="py-6 flex">
      <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
        <ProductThumb product={item} className="h-full" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <ButtonGroup>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <MinusIcon />
            </Button>
            <Button variant="outline" size="icon-sm" disabled>
              {item.quantity}
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <PlusIcon />
            </Button>
          </ButtonGroup>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
