import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { MinusIcon, PlusIcon } from 'lucide-react';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  const handleCheckout = () => {
    // Basic validation - ensure cart is not empty
    if (cart.items.length === 0) {
      // This case shouldn't happen since we're already checking earlier,
      // but added for safety
      alert('Your cart is empty');
      return;
    }

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
              <li key={item.id} className="py-6 flex">
                <div className="size-24 shrink-0 overflow-hidden rounded-lg border border-gray-200">
                  {item.images.length ? (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No image</span>
                    </div>
                  )}
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{item.name}</h3>
                      <p className="ml-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <ButtonGroup>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
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
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="px-1"
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
