import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/types';

type Props = {
  user: User;
};

/**
 * Card component to display address information of the user
 */
export default function AddressInfoCard({ user }: Props) {
  const { address } = user;

  if (!address) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Address Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Street</h3>
            <p className="text-gray-900">{address.street}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">City</h3>
            <p className="text-gray-900">{address.city}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">State</h3>
            <p className="text-gray-900">{address.state}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-500 text-sm">Zip Code</h3>
            <p className="text-gray-900">{address.zipCode}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-medium text-gray-500 text-sm">Country</h3>
            <p className="text-gray-900">{address.country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
