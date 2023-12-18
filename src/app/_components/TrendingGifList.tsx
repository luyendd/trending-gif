"use client";

import GifList from "@/components/GiftList";
import service from "@/services";

// Define TrendingGifList as use client component to pass fetchGifList Promise to Gif List component
export default function TrendingGifList() {
  return <GifList id={service.getTrendingGifs.name} fetchGifList={(payload) => service.getTrendingGifs(payload)} />;
}
