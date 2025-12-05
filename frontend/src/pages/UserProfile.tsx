import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getProfile } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPhoneNumber } from '@/lib/utils';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';

export default function UserProfile() {
  const {
    data: userData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await getProfile();
      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading profile..." />;
  }

  if (error) {
    const errorData =
      error instanceof AxiosError ? error.response?.data : error;
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <ErrorDisplay message={errorData.message} retryText="Retry" />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">Could not load user profile.</p>
        </div>
      </div>
    );
  }

  const { firstName, lastName, email, phone, role, address, createdAt } =
    userData;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <Button variant="outline" disabled>
          Edit Profile
        </Button>
      </div>

      <div className="space-y-6">
        {/* User Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage
                  src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0ea5e9&color=fff`}
                  alt={`${firstName} ${lastName}`}
                />
                <AvatarFallback>
                  {firstName.charAt(0)}
                  {lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">
                  {firstName} {lastName}
                </h2>
                <Badge variant="secondary">{role}</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="font-medium text-gray-500 text-sm">Email</h3>
                <p className="text-gray-900">{email}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 text-sm">Phone</h3>
                <p className="text-gray-900">
                  {phone ? formatPhoneNumber(phone) : 'Not provided'}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 text-sm">
                  Member Since
                </h3>
                <p className="text-gray-900">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information Card */}
        {address && (
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
                  <h3 className="font-medium text-gray-500 text-sm">
                    Zip Code
                  </h3>
                  <p className="text-gray-900">{address.zipCode}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-500 text-sm">Country</h3>
                  <p className="text-gray-900">{address.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
