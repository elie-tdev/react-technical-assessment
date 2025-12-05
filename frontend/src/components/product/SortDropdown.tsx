import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { SortOption } from '@/types';

/**
 * Props for SortDropdown component
 */
type Props = {
  currentSort: SortOption | null;
  onSortChange: (sort: SortOption) => void;
};

// Define available sort options for the products list
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'price_asc', label: 'Lowest Price' },
  { value: 'price_desc', label: 'Highest Price' },
  { value: 'rating', label: 'Most Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function SortDropdown({ currentSort, onSortChange }: Props) {
  // Determine the current sort label to display in the dropdown trigger
  const currentLabel =
    SORT_OPTIONS.find((option) => option.value === currentSort)?.label ||
    'Sort By';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {currentLabel}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SORT_OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSortChange(option.value)}
            className={currentSort === option.value ? 'bg-accent' : ''}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
