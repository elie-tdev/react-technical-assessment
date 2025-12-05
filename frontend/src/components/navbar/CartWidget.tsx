import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

/**
 * Component that displays the cart icon with item count badge
 */
export default function CartWidget() {
  const { isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Button asChild variant="outline">
      <Link to="/cart" className="relative">
        <ShoppingCartIcon className="size-4" />{' '}
        <span className="hidden sm:inline-block">Cart</span>
        {getTotalItems() > 0 && (
          <span className="absolute top-0.5 right-0.5 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full size-5">
            {getTotalItems()}
          </span>
        )}
      </Link>
    </Button>
  );
}
