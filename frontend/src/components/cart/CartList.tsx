import { useCart } from '@/context/CartContext';
import CartListItem from './CartListItem';

/**
 * CartList component renders all items currently in the shopping cart.
 * Maps through the cart items from context and displays each one using
 * the CartListItem component for consistent presentation.
 */
export default function CartList() {
  const { cart } = useCart();

  return (
    <ul className="divide-y divide-gray-200" role="list" aria-label="Shopping cart items">
      {/* Map through each cart item and render a CartListItem component */}
      {cart.items.map((item) => (
        <CartListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
