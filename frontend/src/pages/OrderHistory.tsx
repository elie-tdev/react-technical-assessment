import { useQuery } from '@tanstack/react-query';

import { getOrders } from '@/services/api';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import OrderCard from '@/components/order-history/OrderCard';
import { Link } from 'react-router-dom';

/**
 * OrderHistory page displays user's order history with comprehensive details
 * using a collection of specialized components for maintainability
 */
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
          <Button asChild>
            <Link to="/products">Shop Products</Link>
          </Button>
        </div>
      </div>
    );
  }

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
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
