import { Card, CardContent, CardHeader } from '@/components/ui/card';
import OrderHistoryItem from '@/components/order-history/OrderHistoryItem';
import OrderTotal from './OrderTotal';
import OrderHeader from './OrderHeader';
import type { Order } from '@/types';

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
        <OrderHeader order={order} />
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
