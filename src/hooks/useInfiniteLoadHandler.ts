import React from "react";

type Props = {
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<unknown>;
};

// This hook Intersection Observer to detect when user reach the return Ref element
export default function useInfiniteLoadHandler<TElement extends HTMLImageElement | HTMLDivElement | HTMLElement>({
  isFetching,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: Props) {
  const observer = React.useRef<IntersectionObserver>();
  const lastItemRef = React.useCallback(
    (node: TElement) => {
      if (isFetching || isFetchingNextPage) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          void fetchNextPage();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage],
  );
  return lastItemRef;
}
