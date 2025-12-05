import { useNavigate } from 'react-router-dom';
import { CheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
  orderNumber: string | null;
};

/**
 * Component that displays the order confirmation screen after successful order placement
 */
export default function OrderConfirmationScreen({ orderNumber }: Props) {
  const navigate = useNavigate();

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
          Thank you for your purchase. Your order has been placed successfully.
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
