"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { tabsListVariants } from "@/components/ui/tabs";
import { PROJECT_SOURCES } from "@/constants/projects";
import { getProjectSourceOption } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { ProjectSourceOption, ProjectSource } from "@/types/projects";

import { ProjectSourceLabel } from "./source-label";

interface ProjectSourceComboboxProps {
  value: ProjectSource;
  onChange: (source: ProjectSource) => void;
  className?: string;
}

const isSameSource = (
  item: ProjectSourceOption,
  selected: ProjectSourceOption
): boolean => item.value === selected.value;

const ProjectSourceCombobox = ({
  value,
  onChange,
  className,
}: ProjectSourceComboboxProps) => {
  const selected = getProjectSourceOption(value);

  return (
    <Combobox
      filter={null}
      items={PROJECT_SOURCES}
      value={selected}
      onValueChange={(next) => {
        if (next) {
          onChange(next.value);
        }
      }}
      isItemEqualToValue={isSameSource}
    >
      <ComboboxTrigger
        aria-label="Select project source"
        chevronClassName="h-[calc(100%-1px)] mx-1.5"
        className={cn(
          tabsListVariants({ variant: "default" }),
          "inline-flex w-fit gap-0.5 border-0 shadow-none hover:bg-muted",
          "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring",
          "data-popup-open:bg-muted",
          className
        )}
      >
        <ProjectSourceLabel
          source={selected}
          className="h-[calc(100%-1px)] rounded-md border border-transparent bg-background px-2 py-0.5 text-sm font-medium text-foreground shadow-sm dark:border-input dark:bg-input/30"
        />
      </ComboboxTrigger>
      <ComboboxContent align="start">
        <ComboboxList>
          {(item: ProjectSourceOption) => (
            <ComboboxItem key={item.value} value={item}>
              <ProjectSourceLabel source={item} />
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export { ProjectSourceCombobox };
