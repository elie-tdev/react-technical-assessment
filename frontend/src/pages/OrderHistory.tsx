import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/services/api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import { format } from 'date-fns';

function OrderHistory() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await getOrders();
      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading order history..." />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <ErrorDisplay message={error.message} retryText="Retry" />
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            No Orders Found
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet. Start shopping to see your order
            history here.
          </p>
          <Button>
            <a href="/products">Shop Products</a>
          </Button>
        </div>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
        <p className="text-gray-600 mt-2">
          View and manage your previous orders
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold">
                      #<span className="uppercase">{order.id}</span>
                    </h2>
                    <Badge
                      variant={getStatusVariant(order.status)}
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                    <Badge
                      variant={getPaymentStatusVariant(order.paymentStatus)}
                      className="capitalize"
                    >
                      {order.paymentStatus === 'pending'
                        ? 'Payment Pending'
                        : order.paymentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on{' '}
                    {format(new Date(order.createdAt), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t grid grid-cols-2 gap-4 max-w-xs ml-auto">
                <div className="text-sm text-gray-600">Subtotal:</div>
                <div className="text-right font-medium">
                  ${order.subtotal.toFixed(2)}
                </div>

                <div className="text-sm text-gray-600">Tax:</div>
                <div className="text-right font-medium">
                  ${order.tax.toFixed(2)}
                </div>

                <div className="text-sm text-gray-600">Shipping:</div>
                <div className="text-right font-medium">
                  ${order.shipping.toFixed(2)}
                </div>

                <div className="text-base font-bold text-gray-900 mt-2">
                  Total:
                </div>
                <div className="text-right font-bold text-base mt-2">
                  ${order.total.toFixed(2)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
