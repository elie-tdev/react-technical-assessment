import { format } from 'date-fns';

import OrderStatusBadge from '@/components/order-history/OrderStatusBadge';
import PaymentStatusBadge from '@/components/order-history/PaymentStatusBadge';
import type { Order } from '@/types';

type Props = {
  order: Order;
};

/**
 * Component to display the header section of an order card with ID, status badges, and creation date
 */
export default function OrderHeader({ order }: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold">
            #<span className="uppercase">{order.id}</span>
          </h2>
          <OrderStatusBadge order={order} />
          <PaymentStatusBadge order={order} />
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Placed on {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
        <p className="text-sm text-gray-600 capitalize">
          {order.paymentMethod.replace('_', ' ')}
        </p>
      </div>
    </div>
  );
}
