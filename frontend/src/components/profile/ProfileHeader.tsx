import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  onEditClick?: () => void;
  editDisabled?: boolean;
};

/**
 * Header component for the user profile page with title and edit button
 */
export default function ProfileHeader({
  title,
  onEditClick,
  editDisabled = false,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <Button variant="outline" onClick={onEditClick} disabled={editDisabled}>
        Edit Profile
      </Button>
    </div>
  );
}
