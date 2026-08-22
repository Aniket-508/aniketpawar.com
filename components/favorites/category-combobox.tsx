"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { tabsListVariants } from "@/components/ui/tabs";
import { FAVORITE_CATEGORIES } from "@/constants/favorites";
import { cn } from "@/lib/utils";

interface FavoriteCategoryOption {
  value: string;
  label: string;
}

const FAVORITE_CATEGORY_OPTIONS: readonly FavoriteCategoryOption[] =
  FAVORITE_CATEGORIES.map((category) => ({
    label: category,
    value: category,
  }));

interface FavoriteCategoryComboboxProps {
  value: string;
  onChange: (category: string) => void;
  className?: string;
}

const isSameCategory = (
  item: FavoriteCategoryOption,
  selected: FavoriteCategoryOption
): boolean => item.value === selected.value;

const FavoriteCategoryCombobox = ({
  value,
  onChange,
  className,
}: FavoriteCategoryComboboxProps) => {
  const selected =
    FAVORITE_CATEGORY_OPTIONS.find((option) => option.value === value) ??
    FAVORITE_CATEGORY_OPTIONS[0];

  return (
    <Combobox
      filter={null}
      items={FAVORITE_CATEGORY_OPTIONS}
      value={selected}
      onValueChange={(next) => {
        if (next) {
          onChange(next.value);
        }
      }}
      isItemEqualToValue={isSameCategory}
    >
      <ComboboxTrigger
        aria-label="Select favorite category"
        chevronClassName="h-[calc(100%-1px)] mx-1.5"
        className={cn(
          tabsListVariants({ variant: "default" }),
          "inline-flex w-fit gap-0.5 border-0 shadow-none hover:bg-muted",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
          "data-popup-open:bg-muted",
          className
        )}
      >
        <span className="h-[calc(100%-1px)] rounded-md border border-transparent bg-background px-2 py-0.5 text-sm font-medium text-foreground shadow-sm dark:border-input dark:bg-input/30">
          {selected.label}
        </span>
      </ComboboxTrigger>
      <ComboboxContent align="start">
        <ComboboxList>
          {(item: FavoriteCategoryOption) => (
            <ComboboxItem key={item.value} value={item}>
              <span>{item.label}</span>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export { FavoriteCategoryCombobox };
