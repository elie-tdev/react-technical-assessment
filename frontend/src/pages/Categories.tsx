import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getCategories } from '@/services/api';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import { AxiosError } from 'axios';

export default function Categories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data.data;
    },
  });

  if (isLoading) {
    return <Loading message="Loading categories..." />;
  }

  const categories = data || [];

  if (error) {
    const errorData =
      error instanceof AxiosError ? error.response?.data : error;
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <ErrorDisplay message={errorData.message} retryText="Retry" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

      {categories.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No categories available at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.id}`}
              className="block group"
            >
              <div className="bg-white h-full rounded-lg overflow-hidden border border-gray-200 hover:scale-105 transition-transform duration-300">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
