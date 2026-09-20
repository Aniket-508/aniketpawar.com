export type WritingCategory = "Design" | "Engineering" | "Thoughts";

export interface WritingDate {
  month: string;
  year: number;
}

export interface Writing {
  slug: string;
  title: string;
  description: string;
  category: WritingCategory;
  date: WritingDate;
}
