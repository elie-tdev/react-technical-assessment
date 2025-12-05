import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';

type Props = {
  order: Order;
};

/**
 * OrderStatusBadge component displays the order status with appropriate
 * styling based on the status value (completed, pending, cancelled, etc.)
 */
export default function OrderStatusBadge({ order }: Props) {
  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      case 'processing':
        return 'default';
      case 'shipped':
        return 'default';
      default:
        return 'outline';
    }
  };
  return (
    <Badge variant={getStatusVariant(order.status)} className="capitalize">
      {order.status}
    </Badge>
  );
}
