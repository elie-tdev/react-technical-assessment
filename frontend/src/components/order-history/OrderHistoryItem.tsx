import type { Order } from '@/types';

type Props = {
  item: Order['items'][number];
};

/**
 * OrderHistoryItem component displays a single product within an order,
 * showing its name, quantity, and price details.
 */
export default function OrderHistoryItem({ item }: Props) {
  return (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
      </div>
    </div>
  );
}
