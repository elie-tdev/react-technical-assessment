import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/services/api';
import ShippingInformation from '@/components/checkout/ShippingInformation';
import PaymentInformation from '@/components/checkout/PaymentInformation';
import OrderSummary from '@/components/checkout/OrderSummary';

/**
 * Checkout page component that handles the order placement process.
 * It displays shipping information (pre-filled from user profile),
 * payment information, order summary, and handles the order placement flow.
 * The component has three states: empty cart, checkout form, and order confirmation.
 */
function Checkout() {
  const navigate = useNavigate();
  const { isEmpty, cart, clearCart } = useCart();

  // State for handling order processing
  const [isProcessing, setIsProcessing] = useState(false);

  // State to track if order has been successfully placed
  const [orderPlaced, setOrderPlaced] = useState(false);

  // State to store the generated order number
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  /**
   * Handle placing the order by calling the API and updating states
   * This function processes the cart items and creates an order
   */
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Create order and clear the cart after successful order
    try {
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
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
    }
  };

  // Show order confirmation screen after successful order placement
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

  // Show empty cart message if no items exist
  if (isEmpty) {
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
        {/* Left column: Shipping and payment information forms */}
        <div className="space-y-8">
          <ShippingInformation />
          <PaymentInformation />
        </div>

        {/* Right column: Order summary and place order button */}
        <div>
          <OrderSummary
            handlePlaceOrder={handlePlaceOrder}
            isProcessing={isProcessing}
          />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
