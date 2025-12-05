import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsStringLiteral,
  useQueryState,
  useQueryStates,
} from 'nuqs';

import { getProducts } from '@/services/api';
import Loading from '@/components/Loading';
import ErrorDisplay from '@/components/ErrorDisplay';
import ProductCard from '@/components/product/ProductCard';
import ProductsSearchBar from '@/components/product/ProductsSearchBar';
import ProductCategory from '@/components/product/ProductCategory';
import ProductsPagination from '@/components/product/ProductsPagination';
import SortDropdown from '@/components/product/SortDropdown';
import FilterDialog from '@/components/product/FilterDialog';
import type { SortOption } from '@/types';

/**
 * Products page component to display products with search, category filtering, and pagination
 */
function Products() {
  const [category] = useQueryState('category');

  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const [sort, setSort] = useQueryState(
    'sort',
    parseAsStringLiteral(['price_asc', 'price_desc', 'rating', 'newest'])
  );

  const [filters] = useQueryStates({
    featured: parseAsBoolean,
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  // Local state for search term, current page, sort option, and filters
  const [search, setSearch] = useState('');

  // Fetch products using react-query with search, category, filters, and pagination parameters
  const { data, isFetching, error } = useQuery({
    queryKey: ['products', search, category, currentPage, sort, filters],
    queryFn: async () => {
      const response = await getProducts({
        search,
        category,
        sort,
        page: currentPage,
        limit: 20, // Show 20 products per page
        featured: filters.featured,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
      return response.data.data;
    },
    initialData: {
      products: [],
      pagination: { page: 1, limit: 20, total: 0, pages: 1 },
    },
  });

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  if (error) {
    const errorData =
      error instanceof AxiosError ? error.response?.data : error;
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <ErrorDisplay message={errorData.message} retryText="Retry" />
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

      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <FilterDialog />
        <SortDropdown currentSort={sort} onSortChange={handleSortChange} />
      </div>

      {category && (
        <div className="my-4">
          <ProductCategory categoryId={category} />
        </div>
      )}

      {isFetching && (
        <div className="text-center py-12">
          <Loading message="Loading products..." />
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
          <ProductsPagination pagination={pagination} />
        </>
      )}
    </div>
  );
}

export default Products;
