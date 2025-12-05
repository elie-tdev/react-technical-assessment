import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import CartListItem from '@/components/cart/CartListItem';

function Cart() {
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ul className="divide-y divide-gray-200">
            {cart.items.map((item) => (
              <CartListItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <div className="border-t lg:border-t-0 border-gray-200 pt-6 lg:pt-0">
          <div className="mt-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${getTotalPrice().toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Button className="w-full" size="lg" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="px-2"
                  onClick={() => navigate('/products')}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
