import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getProfile } from '@/services/api';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProfileHeader from '@/components/profile/ProfileHeader';
import PersonalInfoCard from '@/components/profile/PersonalInfoCard';
import AddressInfoCard from '@/components/profile/AddressInfoCard';
import type { User } from '@/types';

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <ProfileHeader
        title="My Profile"
        onEditClick={() => console.log('Edit profile clicked')}
        editDisabled={true}
      />

      <div className="space-y-6">
        <PersonalInfoCard user={userData as User} />
        <AddressInfoCard user={userData as User} />
      </div>
    </div>
  );
}
