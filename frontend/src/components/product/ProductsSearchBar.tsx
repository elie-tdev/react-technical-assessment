import { SearchIcon } from 'lucide-react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

type Props = {
  numOfProducts?: number;
  value: string;
  onChange: (value: string) => void;
};

export default function ProductsSearchBar({
  numOfProducts = 0,
  value,
  onChange,
}: Props) {
  return (
    <InputGroup className="mb-8 bg-muted/80 max-w-xl h-12 rounded-full">
      <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        {numOfProducts} results
      </InputGroupAddon>
    </InputGroup>
  );
}
