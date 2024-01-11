"use client";

import React from "react";
import { useElementSize } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import uniqBy from "lodash/uniqBy";
import { CellMeasurerCache, createMasonryCellPositioner, MasonryProps } from "react-virtualized";
import { CellMeasurerCacheInterface } from "react-virtualized/dist/es/CellMeasurer";

import { Spinner } from "@/components/Spinner";
import useInfiniteLoadHandler from "@/hooks/useInfiniteLoadHandler";
import { ApiResponse, GifResponse, PaginationParams } from "@/services/type";
import { cn } from "@/utils/cn";
import { handleNextPageParam } from "@/utils/infiniteQuery";

import Masonry from "./Masonry";

type Props = {
  id: string;
  masonryProps?: Partial<MasonryProps>;
  fetchGifList: (payload: PaginationParams) => Promise<ApiResponse<GifResponse[]>>;
};

// Gif List components show list of gif with receive {fetchGifList} Promise
export default function GifList({ id, masonryProps, fetchGifList }: Props) {
  // Setup infinite query for {fetchGifList} Promise
  const {
    data: gifListRes,
    isFetched,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [id],
    initialPageParam: 0,
    staleTime: 3600,
    gcTime: 3600,
    refetchOnWindowFocus: false,
    queryFn: ({ pageParam }) => {
      return fetchGifList({ offset: pageParam });
    },
    getNextPageParam: handleNextPageParam,
  });
  // Get last gif ref to assign to last element of the list gif
  const lastGifRef = useInfiniteLoadHandler({
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  // Get width height of the parent masonry element to pass down to masonry element and calculate width column
  const { ref, width, height } = useElementSize();

  const gifs = React.useMemo(
    // Filter duplicated data in case of changing in ranking trending gifs
    () => uniqBy(gifListRes?.pages?.map((item) => item.data || [])?.flat() ?? [], "id"),
    [gifListRes],
  );

  // Default sizes help Masonry decide how many images to batch-measure
  const cache: CellMeasurerCacheInterface = React.useMemo(
    () =>
      new CellMeasurerCache({
        defaultWidth: (width - 32) / 4,
        fixedWidth: true,
      }),
    [width],
  );

  // Masonry layout will use 4 columns with a 8px gutter between
  const cellPositioner = React.useMemo(
    () =>
      createMasonryCellPositioner({
        cellMeasurerCache: cache,
        columnCount: 4,
        columnWidth: (width - 32) / 4,
        spacer: 8,
      }),
    [cache, width],
  );

  return (
    <div className="relative flex grow flex-col">
      {!isFetching && isFetched && gifs.length === 0 && (
        <div className="text-center text-xl font-bold">No gif found</div>
      )}
      <div className="flex grow" ref={ref}>
        <Masonry
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          gifs={gifs}
          height={height}
          lastGifRef={lastGifRef}
          width={width}
          {...masonryProps}
        />
      </div>
      {!isRefetching && (isFetching || isFetchingNextPage) && (
        <div className={cn("absolute left-1/2 translate-x-1/2", isFetchingNextPage ? "bottom-4 top-full" : "top-4")}>
          <Spinner />
        </div>
      )}
    </div>
  );
}
