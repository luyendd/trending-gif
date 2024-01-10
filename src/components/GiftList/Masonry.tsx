import React from "react";
import {
  CellMeasurer,
  MasonryCellProps,
  MasonryProps,
  Positioner,
  Masonry as ReactVirtualizedMasonry,
} from "react-virtualized";
import { CellMeasurerCacheInterface } from "react-virtualized/dist/es/CellMeasurer";

import generateBlurImg from "@/utils/generateBlurImg";
import { GifResponse } from "@/services/type";
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
            <GifItem gif={gif} width={width} height={height} blurImg={blurImg.current[gif.id]} />
          </div>
        </CellMeasurer>
      );
    },
    [cellMeasurerCache, gifs, lastGifRef],
  );

  return (
    <ReactVirtualizedMasonry
      cellMeasurerCache={cellMeasurerCache}
      cellCount={gifs.length}
      cellRenderer={cellRenderer}
      autoHeight={false}
      {...props}
    />
  );
}
