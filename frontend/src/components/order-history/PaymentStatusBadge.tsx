import { Badge } from '@/components/ui/badge';
import type { Order } from '@/types';

type Props = {
  order: Order;
};

/**
 * PaymentStatusBadge component displays the payment status with appropriate
 * styling based on the status value (paid, pending, failed, etc.)
 */
export default function PaymentStatusBadge({ order }: Props) {
  const getPaymentStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'outline';
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Badge
      variant={getPaymentStatusVariant(order.paymentStatus)}
      className="capitalize"
    >
      {order.paymentStatus === 'pending'
        ? 'Payment Pending'
        : order.paymentStatus}
    </Badge>
  );
}
