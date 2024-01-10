import React from "react";
import Image from "next/image";
import Link from "next/link";

import { GifResponse } from "@/services/type";
import { cn } from "@/utils/cn";

import { CloseIcon } from "../icons/CloseIcon";

// Gif Item component display image and detail information when expanded
export default function GifItem({
  gif,
  width,
  height,
  blurImg,
}: {
  gif: GifResponse;
  width: number;
  height: number;
  blurImg: string;
}) {
  const [isShowDetail, setIsShowDetail] = React.useState(false);

  return (
    <div className="relative overflow-hidden rounded" style={{ height, width }}>
      <Image
        alt={gif.alt_text}
        blurDataURL={blurImg}
        className={cn("h-full w-full object-contain", !isShowDetail && "cursor-pointer")}
        height={height}
        placeholder="blur"
        src={gif.images.fixed_height.webp}
        width={width}
        onClick={() => setIsShowDetail(true)}
      />
      {isShowDetail && (
        <div className="absolute inset-x-0 bottom-0">
          <div className="space-y-2 bg-black/[0.5] p-2 text-white">
            <div className="flex items-center justify-between space-x-2">
              <div className="flex grow space-x-2">
                {gif?.user ? (
                  <>
                    {gif.user.avatar_url && (
                      <Image
                        alt={gif.username}
                        className="object-contain"
                        height={24}
                        src={gif.user.avatar_url}
                        width={24}
                      />
                    )}
                    <Link className="line-clamp-1 font-medium" href={gif.user.profile_url} target="_black">
                      {gif.user.display_name}
                    </Link>
                  </>
                ) : (
                  <span className="line-clamp-1 font-medium capitalize">{gif.tags.join(" ")}</span>
                )}
              </div>
              <div className="h-5 w-5">
                <CloseIcon className="h-5 w-5 cursor-pointer" onClick={() => setIsShowDetail(false)} />
              </div>
            </div>
            <div className="line-clamp-2 break-words text-sm">{gif.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
