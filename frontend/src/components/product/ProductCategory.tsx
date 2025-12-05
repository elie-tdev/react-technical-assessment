import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getCategory } from '@/services/api';

type Props = {
  categoryId: string;
};

export default function ProductCategory({ categoryId }: Props) {
  const navigate = useNavigate();
  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      const response = await getCategory(categoryId);
      return response.data.data;
    },
    enabled: !!categoryId,
  });

  return (
    <h2 className="text-xl flex items-center gap-2 font-semibold text-gray-900">
      <span className="font-normal">Filtered by Category:</span>{' '}
      <div className="border pl-2.5 rounded-full">
        {category?.name}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate('/products')}
        >
          <XIcon />
        </Button>
      </div>
    </h2>
  );
}
