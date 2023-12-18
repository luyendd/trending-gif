import React from "react";
import Image from "next/image";
import { GifResponse } from "@/services/type";
import Link from "next/link";
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
    <div className="relative rounded overflow-hidden" style={{ height, width }}>
      <Image
        className={cn("w-full h-full object-contain", !isShowDetail && "cursor-pointer")}
        alt={gif.alt_text}
        src={gif.images.fixed_height.webp}
        height={height}
        width={width}
        placeholder="blur"
        blurDataURL={blurImg}
        onClick={() => setIsShowDetail(true)}
      />
      {isShowDetail && (
        <div className="absolute left-0 right-0 bottom-0">
          <div className="p-2 bg-black/[0.5] text-white space-y-2">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex flex-grow space-x-2">
                {gif?.user ? (
                  <>
                    {gif.user.avatar_url && (
                      <Image
                        alt={gif.username}
                        className="object-contain"
                        src={gif.user.avatar_url}
                        width={24}
                        height={24}
                      />
                    )}
                    <Link className="font-medium line-clamp-1" href={gif.user.profile_url} target="_black">
                      {gif.user.display_name}
                    </Link>
                  </>
                ) : (
                  <span className="font-medium line-clamp-1 capitalize">{gif.tags.join(" ")}</span>
                )}
              </div>
              <div className="w-5 h-5">
                <CloseIcon className="cursor-pointer w-5 h-5" onClick={() => setIsShowDetail(false)} />
              </div>
            </div>
            <div className="text-sm line-clamp-2 break-words">{gif.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
