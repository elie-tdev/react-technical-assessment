import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

/**
 * Component that displays navigation links when user is authenticated
 */
export default function NavigationLinks() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="hidden sm:flex items-center space-x-4">
      <Button asChild variant="ghost">
        <Link to="/products">Products</Link>
      </Button>
      <Button asChild variant="ghost">
        <Link to="/categories">Categories</Link>
      </Button>
    </div>
  );
}
