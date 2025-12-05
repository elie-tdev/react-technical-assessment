import { format } from 'date-fns';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OrderHistoryItem from '@/components/order-history/OrderHistoryItem';
import OrderStatusBadge from './OrderStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';
import type { Order } from '@/types';
import OrderTotal from './OrderTotal';

type OrderCardProps = {
  order: Order;
};

/**
 * OrderCard component displays a single order with its details
 * including order ID, status badges, items, and total cost breakdown
 */
function OrderCard({ order }: OrderCardProps) {
  return (
    <Card>
      <CardHeader className="border-b">
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
              Placed on{' '}
              {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
            <p className="text-sm text-gray-600 capitalize">
              {order.paymentMethod.replace('_', ' ')}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {order.items.map((item, index) => (
            <OrderHistoryItem key={index} item={item} />
          ))}
        </div>
        <OrderTotal order={order} />
      </CardContent>
    </Card>
  );
}

export default OrderCard;
