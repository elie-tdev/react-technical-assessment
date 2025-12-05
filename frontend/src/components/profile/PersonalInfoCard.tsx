import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatPhoneNumber } from '@/lib/utils';
import type { User } from '@/types';

type Props = {
  user: User;
};

/**
 * Card component to display personal information of the user
 */
export default function PersonalInfoCard({ user }: Props) {
  const { firstName, lastName, email, phone, role, createdAt } = user;

  return (
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
            <h3 className="font-medium text-gray-500 text-sm">Member Since</h3>
            <p className="text-gray-900">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
