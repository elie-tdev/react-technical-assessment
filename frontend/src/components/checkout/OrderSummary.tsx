import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  handlePlaceOrder: (e: React.FormEvent<Element>) => Promise<void>;
  isProcessing: boolean;
};

export default function OrderSummary({
  handlePlaceOrder,
  isProcessing,
}: Props) {
  const navigate = useNavigate();
  const { cart, getTotalPrice } = useCart();

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Display each item in the cart with name, quantity, and price */}
        <ul className="divide-y divide-gray-200 mb-4">
          {cart.items.map((item) => (
            <li key={item.id} className="py-4 flex">
              <div className="size-16 shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                  <div className="flex justify-between text-sm font-medium text-gray-900">
                    <h3>{item.name}</h3>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <p>Qty: {item.quantity}</p>
                  <p>${item.price.toFixed(2)}/each</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Calculate and display order totals including tax and shipping */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
            <p>Subtotal</p>
            <p>${getTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
            <p>Shipping</p>
            <p>$5.99</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 mb-1">
            <p>Tax</p>
            <p>${(getTotalPrice() * 0.08).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold text-gray-900 mt-4 pt-4 border-t border-gray-200">
            <p>Total</p>
            <p>
              ${(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(2)}
            </p>
          </div>
        </div>

        <Button
          className="w-full mt-6"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>

        <Button
          variant="outline"
          className="w-full mt-3"
          onClick={handleContinueShopping}
          disabled={isProcessing}
        >
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
}
