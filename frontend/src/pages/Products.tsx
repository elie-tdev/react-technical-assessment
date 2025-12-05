import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getProducts } from '@/services/api';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProductCard from '@/components/product/ProductCard';
import ProductsSearchBar from '@/components/product/ProductsSearchBar';
import ProductCategory from '@/components/product/ProductCategory';
import ProductsPagination from '@/components/product/ProductsPagination';

/**
 * Products page component to display products with search, category filtering, and pagination
 */
function Products() {
  // Get search parameters from URL to maintain state across page refreshes
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);

  // Local state for search term and current page
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  // Fetch products using react-query with search, category, and pagination parameters
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search, category, currentPage],
    queryFn: async () => {
      const response = await getProducts({
        search,
        category,
        page: currentPage,
        limit: 20, // Show 20 products per page
      });
      return response.data.data;
    },
    initialData: {
      products: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 1 },
    },
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

  const { products, pagination } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <div className="flex items-center justify-center">
        <ProductsSearchBar
          value={search}
          onChange={setSearch}
          numOfProducts={pagination.total}
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <ProductsPagination
            pagination={pagination}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default Products;
