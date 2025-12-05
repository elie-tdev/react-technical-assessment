import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import CartSubtotal from '@/components/cart/CartSubtotal';
import CartList from '@/components/cart/CartList';

/**
 * Cart page component that displays all items in the user's shopping cart
 * Shows empty cart message when no items are present, otherwise renders
 * the cart items list and subtotal section
 */
function Cart() {
  const navigate = useNavigate();
  const { isEmpty } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {/* Show empty cart message if no items exist */}
      {isEmpty ? (
        <>
          <p className="text-gray-500">Your cart is empty</p>
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={() => navigate('/products')}
            aria-label="Continue shopping and return to products page"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Button>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Display cart items and subtotal when cart is not empty */}
          <div className="lg:col-span-2" role="main">
            <CartList />
          </div>
          <div className="border-t lg:border-t-0 border-gray-200 pt-6 lg:pt-0">
            <CartSubtotal />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
