import type React from "react";

export interface TechStackItem {
  key: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
  categories: string[];
}
