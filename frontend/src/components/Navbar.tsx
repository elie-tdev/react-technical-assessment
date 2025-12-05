import { Link } from 'react-router-dom';

import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';
import UserMenu from './UserMenu';

function Navbar() {
  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold">
              Marketplace
            </Link>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost">
                <Link to="/products">Products</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/categories">Categories</Link>
              </Button>
            </div>
          )}

          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <Button asChild variant="ghost">
                <Link to="/cart" className="relative">
                  <ShoppingCartIcon className="size-4" /> Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full size-5">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </Button>
            )}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
