import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid2X2Check,
  LogOutIcon,
  Package2Icon,
  ShoppingBagIcon,
  UserIcon,
} from 'lucide-react';
import { getProfile } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export default function UserMenu() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data.data;
    },
  });
  const firstName = userData?.firstName || 'John';
  const lastName = userData?.lastName || 'Doe';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage
            src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0ea5e9&color=fff`}
            alt={`${firstName} ${lastName}`}
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <UserIcon />
            View your profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/order-history">
            <Package2Icon />
            Order History
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="sm:hidden">
          <Link to="/products">
            <ShoppingBagIcon />
            Products
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="sm:hidden">
          <Link to="/categories">
            <Grid2X2Check />
            Categories
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
