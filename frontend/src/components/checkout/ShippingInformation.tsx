import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/services/api';

export default function ShippingInformation() {
  // Fetch user profile data to pre-fill shipping information
  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data.data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Shipping Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="John Doe"
              defaultValue={`${userData?.firstName} ${userData?.lastName}`}
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              placeholder="123 Main St"
              defaultValue={userData?.address.street}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <Input
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                defaultValue={userData?.address.city}
                required
              />
            </div>

            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ZIP Code
              </label>
              <Input
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="10001"
                defaultValue={userData?.address.zipCode}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(123) 456-7890"
              defaultValue={userData?.phone}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
