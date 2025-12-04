import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from 'lucide-react';

import { getProducts } from '@/services/api';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProductCard from '@/components/ProductCard';

function Products() {
  const [search, setSearch] = useState('');

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const response = await getProducts({ search });
      return response.data.data.products;
    },
    initialData: [],
  });

  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

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
        <InputGroup className="mb-8 bg-muted/80 max-w-xl h-12 rounded-full">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {products.length} results
          </InputGroupAddon>
        </InputGroup>
      </div>

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
