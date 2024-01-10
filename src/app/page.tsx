import { TrendingIcon } from "@/components/icons/TrendingIcon";

import TrendingGifList from "./_components/TrendingGifList";

// Home page that displays trending gifs
export default function HomePage() {
  return (
    <div className="flex grow flex-col space-y-4">
      <div className="flex gap-2">
        <TrendingIcon className="text-blue-500" />
        <h1 className="text-xl font-bold">Trending Gifs</h1>
      </div>
      <TrendingGifList />
    </div>
  );
}
