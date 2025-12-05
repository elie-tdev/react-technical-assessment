import { useState } from 'react';
import { FilterIcon } from 'lucide-react';
import { parseAsBoolean, parseAsInteger, useQueryStates } from 'nuqs';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function FilterDialog() {
  const [open, setOpen] = useState(false);

  // Synchronize query parameters with component state
  const [filters, setFilters] = useQueryStates({
    featured: parseAsBoolean,
    minPrice: parseAsInteger,
    maxPrice: parseAsInteger,
  });

  // Local state to manage filter values independently from URL
  const [featured, setFeatured] = useState(filters.featured === true);
  const [minPrice, setMinPrice] = useState<string>(
    filters.minPrice?.toString() || ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    filters.maxPrice?.toString() || ''
  );

  // Clears all filter values and resets the form
  const handleClear = () => {
    setFeatured(false);
    setMinPrice('');
    setMaxPrice('');

    // Reset query parameters to clear filters
    setFilters({
      featured: null,
      minPrice: null,
      maxPrice: null,
    });

    setOpen(false);
  };

  // Applies current filter values to URL parameters
  const handleApply = () => {
    setFilters({
      featured: featured ? true : null,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    });
    setOpen(false);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(!open)}>
        <FilterIcon />
        Filters
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Filters</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Featured Filter */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="featured"
                checked={featured}
                onCheckedChange={(checked) => setFeatured(!!checked)}
                key={`${featured}`}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-gray-700 font-medium mb-3">Price Range</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="minPrice"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    Min Price
                  </Label>
                  <Input
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="maxPrice"
                    className="block text-sm text-gray-600 mb-1"
                  >
                    Max Price
                  </Label>
                  <Input
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button variant="outline" onClick={handleClear}>
              Clear Filters
            </Button>
            <Button onClick={handleApply}>Apply Filters</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
