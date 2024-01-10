"use client";

import React, { Key } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";

import Autocomplete, { SelectItem } from "@/components/Autocomplete";
import { DEBOUNCE_TIME } from "@/constants";
import service from "@/services";

// Home search component displays search input as an Autocomplete component and redirects to search pages to show search results
export default function HomeSearch() {
  const [searchValue, setSearchValue] = React.useState("");
  // Setup debounce for search input to prevent calling too many unnecessary requests
  const [debouncedSearchTerm] = useDebouncedValue(searchValue, DEBOUNCE_TIME);
  const router = useRouter();
  const ref = React.useRef<HTMLInputElement>(null);

  // Get trending searches to set initial data for Autocomplete component
  const { data: trendingSearches } = useQuery({
    queryKey: [service.getTrendingSearches.name],
    queryFn: () => {
      return service.getTrendingSearches();
    },
    staleTime: 3600,
    gcTime: 3600,
  });

  // Get search tags with search value for Autocomplete component
  const { data: searchTags, isLoading } = useQuery({
    queryKey: [service.getTrendingSearches.name, debouncedSearchTerm],
    queryFn: () => {
      return service.getSearchTags({ q: debouncedSearchTerm });
    },
    staleTime: 3600,
    gcTime: 3600,
    enabled: !!debouncedSearchTerm,
  });

  const trendingSelect: SelectItem[] = React.useMemo(
    () =>
      trendingSearches?.data?.length
        ? [
            { value: "", label: "📈 Trending search", isReadOnly: true },
            ...trendingSearches.data.map((value) => ({ label: value, value })),
          ]
        : [],
    [trendingSearches],
  );

  const selectTags: SelectItem[] = React.useMemo(
    () => (searchTags?.data ?? []).map((tag) => ({ value: tag.name, label: tag.name })),
    [searchTags],
  );

  const items = React.useMemo(
    () => (searchValue && debouncedSearchTerm ? selectTags : trendingSelect),
    [searchValue, debouncedSearchTerm, selectTags, trendingSelect],
  );

  // Handle redirect action
  const handleRedirect = React.useCallback(() => {
    // If search value is empty value, redirect to home page
    if (!searchValue) {
      router.push(`/`);
      return;
    }
    // Otherwise, redirect to search page with search value
    router.push(`/search/${searchValue}`);
  }, [router, searchValue]);

  // Handle callback when user press Enter
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleRedirect();
      }
    },
    [handleRedirect],
  );

  // Handle selection change
  const handleSelectionChange = (key: Key) => {
    if (key) {
      if (ref.current) {
        ref.current.blur();
      }
      setSearchValue(key.toString());
      router.push(`/search/${key}`);
    }
  };

  return (
    <Autocomplete
      aria-label="home-search-input"
      id="home-search-input"
      inputValue={searchValue}
      isLoading={isLoading}
      items={items}
      menuTrigger="focus"
      placeholder="Search for all the Gifs"
      ref={ref}
      searchIconProps={{ onClick: handleRedirect, "aria-label": "Search combobox icon" }}
      allowsEmptyCollection
      onInputChange={setSearchValue}
      onKeyDown={handleKeyDown}
      onSelectionChange={handleSelectionChange}
    />
  );
}
