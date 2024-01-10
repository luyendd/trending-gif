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
    <div className="flex grow flex-col space-y-4">
      <h1 className="flex gap-2 text-xl font-bold">Gifs for {decodeURI(searchValue)}</h1>
      <SearchGifList searchValue={searchValue} />
    </div>
  );
}
