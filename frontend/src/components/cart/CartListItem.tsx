import { Button } from '@/components/ui/button';
import { useCart, type CartItem } from '@/context/CartContext';
import ProductThumb from '@/components/product/ProductThumb';
import QuantityButtons from './QuantityButtons';

type Props = {
  item: CartItem;
};

/**
 * CartListItem component displays a single cart item with its image,
 * name, price, quantity controls, and remove button.
 * It allows users to update quantity or remove items from their cart.
 */
export default function CartListItem({ item }: Props) {
  const { removeFromCart } = useCart();

  return (
    <li className="py-6 flex" role="listitem">
      {/* Display product thumbnail image */}
      <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
        <ProductThumb product={item} className="h-full" />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          {/* Display product name and total price for this item (price * quantity) */}
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="text-lg font-medium">{item.name}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity controls to adjust item count in cart */}
          <QuantityButtons item={item} />
          {/* Button to remove the item from the cart */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
