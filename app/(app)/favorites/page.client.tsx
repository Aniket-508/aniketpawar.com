"use client";

import { useState, useMemo } from "react";

import { FavoriteCategoryCombobox } from "@/components/favorites/category-combobox";
import { FavoritesView } from "@/components/favorites/view";
import type { GlimpseData } from "@/components/ui/glimpse/types";
import { Input } from "@/components/ui/input";
import { ViewToggle } from "@/components/view-tabs";
import { FAVORITES } from "@/constants/favorites";
import type { Variant } from "@/lib/events";

interface FavoritesPageClientProps {
  previews?: Record<string, GlimpseData>;
}

const EMPTY_PREVIEWS: Record<string, GlimpseData> = {};

const FavoritesPageClient = ({
  previews = EMPTY_PREVIEWS,
}: FavoritesPageClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [variant, setVariant] = useState<Variant>("grid");

  const filteredFavorites = useMemo(
    () =>
      FAVORITES.filter((favorite) => {
        const matchesSearch =
          searchQuery === "" ||
          favorite.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          favorite.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || favorite.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }),
    [searchQuery, selectedCategory]
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search favorites..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <FavoriteCategoryCombobox
          value={selectedCategory}
          onChange={setSelectedCategory}
        />
        <ViewToggle value={variant} onChange={setVariant} section="favorites" />
      </div>
      <FavoritesView
        showHeader={false}
        variant={variant}
        onVariantChange={setVariant}
        favorites={filteredFavorites}
        previews={previews}
      />
    </>
  );
};

export default FavoritesPageClient;
