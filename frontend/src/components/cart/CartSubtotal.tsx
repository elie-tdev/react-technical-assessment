import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

/**
 * CartSubtotal component displays the cart's total price and provides
 * checkout and continue shopping buttons. It calculates the subtotal
 * using the cart context and provides navigation to the checkout page.
 */
export default function CartSubtotal() {
  const navigate = useNavigate();
  const { getTotalPrice } = useCart();

  const handleCheckout = () => {
    // Navigate to checkout page when user clicks checkout button
    navigate('/checkout');
  };

  return (
    <div className="mt-6" role="complementary" aria-labelledby="cart-subtotal-title">
      <h2 id="cart-subtotal-title" className="sr-only">Order Summary</h2>
      {/* Display the calculated subtotal from cart context */}
      <div className="flex justify-between text-base font-medium text-gray-900">
        <p>Subtotal</p>
        <p aria-label={`Cart subtotal: $${getTotalPrice().toFixed(2)}`}>${getTotalPrice().toFixed(2)}</p>
      </div>
      <p className="mt-0.5 text-sm text-gray-500">
        Shipping and taxes calculated at checkout.
      </p>
      <div className="mt-6">
        {/* Button to proceed to checkout */}
        <Button className="w-full" size="lg" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
        {/* Alternative option to continue shopping instead of checking out */}
        <p>
          or{' '}
          <Button
            type="button"
            variant="ghost"
            className="px-2"
            onClick={() => navigate('/products')}
            aria-label="Continue shopping and return to products page"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Button>
        </p>
      </div>
    </div>
  );
}
