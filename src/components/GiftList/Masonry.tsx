import React from "react";
import {
  CellMeasurer,
  Masonry as ReactVirtualizedMasonry,
  MasonryCellProps,
  MasonryProps,
  Positioner,
} from "react-virtualized";
import { CellMeasurerCacheInterface } from "react-virtualized/dist/es/CellMeasurer";

import { GifResponse } from "@/services/type";
import generateBlurImg from "@/utils/generateBlurImg";

import GifItem from "./GifItem";

type Props = Partial<MasonryProps> & {
  gifs: GifResponse[];
  cellPositioner: Positioner;
  cellMeasurerCache: CellMeasurerCacheInterface;
  width: number;
  height: number;
  lastGifRef: (node: HTMLImageElement & HTMLDivElement & HTMLElement) => void;
};

export default function Masonry({ gifs, lastGifRef, cellMeasurerCache, ...props }: Props) {
  const blurImg = React.useRef<{ [key: string]: string }>({});

  // Callback to render each cell
  const cellRenderer = React.useCallback(
    ({
      index, // Index of item within the collection
      key, // Unique key within array of cells
      parent, // Reference to the parent Grid (instance)
      style, // Style object to be applied to cell (to position it)
    }: MasonryCellProps) => {
      const gif = gifs[index];
      const height = gif.images.fixed_height.height;
      const width = gif.images.fixed_height.width;

      // Cache current color with each id to prevent re-render images so blur colors flicking
      if (!blurImg.current[gif.id]) {
        blurImg.current[gif.id] = generateBlurImg();
      }

      return (
        <CellMeasurer cache={cellMeasurerCache} index={index} key={key} parent={parent}>
          <div ref={index === gifs.length - 1 ? lastGifRef : null} style={style}>
            <GifItem blurImg={blurImg.current[gif.id]} gif={gif} height={height} width={width} />
          </div>
        </CellMeasurer>
      );
    },
    [cellMeasurerCache, gifs, lastGifRef],
  );

  return (
    <ReactVirtualizedMasonry
      autoHeight={false}
      cellCount={gifs.length}
      cellMeasurerCache={cellMeasurerCache}
      cellRenderer={cellRenderer}
      {...props}
    />
  );
}
