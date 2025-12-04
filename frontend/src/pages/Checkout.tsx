import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { createOrder, getProfile } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart, getTotalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data.data;
    },
  });

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    console.log('Processing order:', cart);

    // Create order and clear the cart after successful order
    const response = await createOrder({
      items: cart.items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      paymentMethod: 'credit_card',
    });
    const order = response.data.data;
    setOrderNumber(order.id);
    clearCart();

    setIsProcessing(false);
    setOrderPlaced(true);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon className="size-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed
            successfully.
          </p>
          <div className="space-y-4">
            <Button
              className="w-full md:w-auto"
              onClick={() => navigate('/products')}
            >
              Continue Shopping
            </Button>
            <p className="text-sm text-gray-500">
              Order #: <span className="uppercase">{orderNumber}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-500">Your cart is empty</p>
        <Button onClick={() => navigate('/products')} className="mt-4">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={`${userData?.firstName} ${userData?.lastName}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    type="text"
                    placeholder="123 Main St"
                    value={userData?.address.street}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Input
                      type="text"
                      placeholder="New York"
                      value={userData?.address.city}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <Input
                      type="text"
                      placeholder="10001"
                      value={userData?.address.zipCode}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={userData?.phone}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <Input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiration Date
                    </label>
                    <Input type="text" placeholder="MM/YY" disabled />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVC
                    </label>
                    <Input type="text" placeholder="123" disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                  </label>
                  <Input type="text" placeholder="John Doe" disabled />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg font-medium">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                          <span className="text-gray-500 text-xs">
                            No image
                          </span>
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
                    $
                    {(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(
                      2
                    )}
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
        </div>
      </div>
    </div>
  );
}

export default Checkout;
