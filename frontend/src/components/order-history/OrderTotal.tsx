import type { Order } from '@/types';

type Props = {
  order: Order;
};

/**
 * OrderTotal component displays the cost breakdown for an order
 * including subtotal, tax, shipping, and total amounts
 */
export default function OrderTotal({ order }: Props) {
  return (
    <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4 max-w-xs ml-auto">
      <div className="text-sm text-gray-600">Subtotal:</div>
      <div className="text-right font-medium">${order.subtotal.toFixed(2)}</div>

      <div className="text-sm text-gray-600">Tax:</div>
      <div className="text-right font-medium">${order.tax.toFixed(2)}</div>

      <div className="text-sm text-gray-600">Shipping:</div>
      <div className="text-right font-medium">${order.shipping.toFixed(2)}</div>

      <div className="text-base font-bold text-gray-900 mt-2">Total:</div>
      <div className="text-right font-bold text-base mt-2">
        ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
