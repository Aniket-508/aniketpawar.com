"use client";

import { SearchIcon } from "lucide-react";
import { debounce } from "nuqs";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useSearchQueryState } from "@/lib/search-params/hooks";
import { SEARCH_QUERY_DEFAULT } from "@/lib/search-params/parsers";

interface SearchInputProps {
  queryKey: string;
  defaultValue?: string;
  id?: string;
  placeholder?: string;
  className?: string;
}

const SearchInput = ({
  queryKey,
  defaultValue = SEARCH_QUERY_DEFAULT,
  id,
  placeholder,
  className,
}: SearchInputProps) => {
  const [value, setValue] = useSearchQueryState(queryKey, defaultValue);

  return (
    <InputGroup className={className}>
      <InputGroupInput
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          const nextValue = event.target.value;

          void setValue(nextValue, {
            limitUrlUpdates: nextValue === "" ? undefined : debounce(300),
          });
        }}
        className="flex-1"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export { SearchInput };
