import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';
import { useAuth } from '@/context/AuthContext';

/**
 * Component that handles authentication-dependent UI controls
 * Shows either login button or user menu based on authentication status
 */
export default function AuthControls() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <UserMenu />
      ) : (
        <Button asChild>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </>
  );
}
