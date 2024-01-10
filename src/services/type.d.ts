export type Body<T> = {
  [key in keyof T]: T[keyof T];
};

export type Pagination = {
  total_count: number;
  count: number;
  offset: number;
};

export type Meta = {
  status: number;
  msg: string;
  response_id: string;
};

export type ApiResponse<T> = {
  data?: T;
  pagination?: Pagination;
  meta: Meta;
};

export type PaginationParams = {
  limit?: number; // The maximum number of objects to return. (Default: “25”)
  offset?: number; // Specifies the starting position of the results. Default: “0”; Maximum: “4999”
};

export type TrendingGifsParams = {
  rating?: string; // Filters results by specified rating. Acceptable values include g, pg, pg-13, r. If you do not specify a rating, you will receive results from all possible ratings.
  random_id?: string; //	An ID/proxy for a specific user.
  bundle?: string; //	messaging_non_clips	Returns only renditions that correspond to the named bundle. Read more about renditions.
} & PaginationParams;

export type ImageStaticResponse = { height: number; width: number; size: number; url: string };
export type FullImageResponse = {
  mp4_size: number;
  mp4: string;
} & WebpImageResponse;
export type WebpImageResponse = ImageStaticResponse & {
  webp_size: number;
  webp: string;
};
export type MP4ImageResponse = {
  height: number;
  width: number;
  mp4_size: number;
  mp4: string;
};

export type GifResponse = {
  type: string;
  id: string; // This GIF's unique ID
  url: string; // The unique URL for this GIF
  slug: string; // The unique slug used in this GIF's URL
  bitly_url: string; // The unique bit.ly URL for this GIF
  embed_url: string; // A URL used for embedding this GIF
  username: string; // The username this GIF is attached to, if applicable
  source: string; // The page on which this GIF was found
  title: string; // The title that appears on giphy.com for this GIF.
  rating: string; // The MPAA-style rating for this content. Examples include Y, G, PG, PG-13 and R
  tags: string[]; // List of channel tags
  featured_tags: string[];
  source_tld: string; // The top level domain of the source URL.
  source_post_url: string; // The URL of the webpage on which this GIF was found.
  is_hidden: number;
  is_removed: number;
  is_community: number;
  is_anonymous: number;
  is_featured: number;
  is_realtime: number;
  import_datetime: string; // The creation or upload date from this GIF's source.
  trending_datetime: string; // The date on which this gif was marked trending, if applicable.
  create_datetime: string;
  update_datetime: string;
  // Images Object found in the GIF Object contains a series of Rendition Objects: https://developers.giphy.com/docs/optional-settings/#rendition-guide
  images: {
    original: { frames: number; hash: string } & FullImageResponse;
    downsized: ImageStaticResponse;
    downsized_large: ImageStaticResponse;
    downsized_medium: ImageStaticResponse;
    downsized_small: MP4ImageResponse;
    downsized_still: ImageStaticResponse;
    fixed_height: FullImageResponse;
    fixed_height_downsampled: WebpImageResponse;
    fixed_height_small: FullImageResponse;
    fixed_height_small_still: ImageStaticResponse;
    fixed_height_still: ImageStaticResponse;
    fixed_width: FullImageResponse;
    fixed_width_downsampled: FullImageResponse;
    fixed_width_small: FullImageResponse;
    fixed_width_small_still: ImageStaticResponse;
    fixed_width_still: ImageStaticResponse;
    looping: {
      mp4_size: number;
      mp4: string;
    };
    original_still: ImageStaticResponse;
    original_mp4: MP4ImageResponse;
    preview: MP4ImageResponse;
    preview_gif: ImageStaticResponse;
    preview_webp: ImageStaticResponse;
    source: ImageStaticResponse;
    hd?: Omit<FullImageResponse, "url" | "size">;
    "480w_still": ImageStaticResponse;
  };
  // User Object
  user?: {
    id: number;
    avatar_url: string;
    banner_image: string;
    banner_url: string;
    profile_url: string;
    username: string;
    display_name: string;
    name: string;
    attribution_display_name: string;
    description: string;
    user_type: string;
    facebook_url: string;
    instagram_url: string;
    twitter_url: string;
    twitter: string;
    tumblr_url: string;
    website_url: string;
    website_display_url: string;
    is_public: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    suppress_chrome: boolean;
  };
  has_attribution: boolean;
  alt_text: string; // Alt text enables assistive programs to read descriptions of GIFs.
};

export type SearchGifsParams = {
  q: string;
  lang?: string;
} & TrendingGifsParams;

export type SearchTagParams = {
  q: string;
} & PaginationParams;
