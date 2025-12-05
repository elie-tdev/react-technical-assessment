import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { XIcon } from 'lucide-react';
import { AxiosError } from 'axios';

import { getCategory } from '@/services/api';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';

type Props = {
  categoryId: string;
};

export default function ProductCategory({ categoryId }: Props) {
  // Update category query parameter to null when clearing the filter
  const [, setCategory] = useQueryState('category');

  const {
    data: category,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await getCategory(categoryId);
      return response.data.data;
    },
    enabled: !!categoryId,
  });

  if (isLoading) {
    return <Loading message="Loading category..." />;
  }

  if (error) {
    const errorData =
      error instanceof AxiosError ? error.response?.data : error;
    return <ErrorDisplay message={errorData.message} retryText="Retry" />;
  }

  return (
    <h2 className="text-xl flex items-center gap-2 font-semibold text-gray-900">
      <span className="font-normal">Filtered by Category:</span>{' '}
      <div className="border pl-2.5 rounded-full">
        {category?.name}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setCategory(null)}
        >
          <XIcon />
        </Button>
      </div>
    </h2>
  );
}
