import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '@/services/api';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProductCard from '@/components/ProductCard';
import ProductsSearchBar from './ProductsSearchBar';
import ProductCategory from './ProductCategory';

function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;

  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search, category],
    queryFn: async () => {
      const response = await getProducts({ search, category });
      return response.data.data.products;
    },
    initialData: [],
  });

  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  const products = data || [];

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <ErrorDisplay message={error.message} retryText="Retry" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="flex items-center justify-center">
        <ProductsSearchBar
          value={search}
          onChange={setSearch}
          numOfProducts={products.length}
        />
      </div>

      {category && (
        <div className="my-4">
          <ProductCategory categoryId={category} />
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products available at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
