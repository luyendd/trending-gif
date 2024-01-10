"use client";

import GifList from "@/components/GiftList";
import service from "@/services";

// Define SearchGifList as use client component to pass fetchGifList Promise to Gif List component
export default function SearchGifList({ searchValue }: { searchValue: string }) {
  return (
    <GifList
      fetchGifList={(payload) => service.getGifs({ ...payload, q: searchValue })}
      id={`${service.getGifs.name}-${searchValue}`}
    />
  );
}
