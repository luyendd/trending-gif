import SearchGifList from "./_components/SearchGifList";

type Props = {
  params: {
    searchValue: string;
  };
};

// Home page that displays gifs based search value
export default function SearchValuePage({ params }: Props) {
  const searchValue = params.searchValue;
  return (
    <div className="space-y-4 flex flex-col flex-grow">
      <h1 className="flex gap-2 font-bold text-xl">Gifs for {decodeURI(searchValue)}</h1>
      <SearchGifList searchValue={searchValue} />
    </div>
  );
}
