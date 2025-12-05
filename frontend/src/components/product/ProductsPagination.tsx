import { parseAsInteger, useQueryState } from 'nuqs';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginationData, Product } from '@/types';

/**
 * Props for ProductsPagination component
 */
type Props = {
  pagination: PaginationData<Product>['pagination'];
};

/**
 * Pagination component for products page that handles page navigation
 * and updates URL parameters to maintain state across page refreshes
 */
export default function ProductsPagination({ pagination }: Props) {
  const [, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  /**
   * Handles page change by updating both local state and URL parameters
   * @param newPage - The page number to navigate to
   */
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.pages) return;
    setCurrentPage(newPage);
  };

  /**
   * Generate pagination items to display with ellipsis for large page sets
   * @returns Array of page numbers and ellipsis markers to display
   */
  const getPaginationItems = () => {
    const items = [];
    const totalPages = pagination.pages;
    const currentPage = pagination.page;

    if (totalPages <= 7) {
      // If total pages are 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      // Show first page, current page(s), last page, and ellipsis as needed
      items.push(1);

      if (currentPage > 3) {
        items.push('ellipsis-start');
      }

      // Show pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        items.push(i);
      }

      if (currentPage < totalPages - 2) {
        items.push('ellipsis-end');
      }

      if (totalPages > 1) {
        items.push(totalPages);
      }
    }

    return items;
  };

  return (
    <div className="mt-12 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(pagination.page - 1)}
              className={
                pagination.page <= 1
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>

          {getPaginationItems().map((item, index) =>
            item === 'ellipsis-start' || item === 'ellipsis-end' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  isActive={pagination.page === item}
                  onClick={() => handlePageChange(item as number)}
                  className="cursor-pointer"
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(pagination.page + 1)}
              className={
                pagination.page >= pagination.pages
                  ? 'pointer-events-none opacity-50'
                  : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
