import { TrendingIcon } from "@/components/icons/TrendingIcon";
import TrendingGifList from "./_components/TrendingGifList";

// Home page that displays trending gifs
export default function HomePage() {
  return (
    <div className="space-y-4 flex flex-col flex-grow">
      <div className="flex gap-2">
        <TrendingIcon className="text-blue-500" />
        <h1 className="font-bold text-xl">Trending Gifs</h1>
      </div>
      <TrendingGifList />
    </div>
  );
}
