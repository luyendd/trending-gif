import { afterEach, describe, vi, beforeAll, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { faker } from "@faker-js/faker";

import GifList from ".";
import service from "@/services";
import { Providers } from "@/providers";
import startServer from "@/mocks/startServer";
import { userEvent } from "@testing-library/user-event";
import { GifResponse } from "@/services/type";

function createGif(_: null, idx: number): GifResponse {
  return {
    type: "gif",
    id: faker.string.uuid(),
    url: faker.image.url(),
    slug: faker.string.alpha(),
    bitly_url: faker.image.url(),
    embed_url: faker.image.url(),
    username: faker.lorem.word(),
    source: faker.image.url(),
    title: faker.lorem.text(),
    is_hidden: 0,
    is_removed: 0,
    is_community: 0,
    is_anonymous: 0,
    is_featured: 0,
    is_realtime: 0,
    rating: "pg",
    tags: new Array(5).fill(null).map(() => faker.lorem.words(2)),
    featured_tags: new Array(2).fill(null).map(() => faker.lorem.words(2)),
    source_tld: faker.internet.domainName(),
    source_post_url: faker.image.url(),
    import_datetime: faker.date.anytime().toString(),
    trending_datetime: faker.date.anytime().toString(),
    create_datetime: faker.date.anytime().toString(),
    update_datetime: faker.date.anytime().toString(),
    images: {
      original: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
        frames: faker.number.int({ min: 1, max: 120 }),
        hash: faker.git.commitSha(),
      },
      downsized: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      downsized_large: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      downsized_medium: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      downsized_small: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
      },
      downsized_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      fixed_height: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_height_downsampled: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_height_small: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_height_small_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      fixed_height_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      fixed_width: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_width_downsampled: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_width_small: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
        webp_size: faker.number.int({ min: 10000 }),
        webp: faker.image.url(),
      },
      fixed_width_small_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      fixed_width_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      looping: {
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
      },
      original_still: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      original_mp4: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
      },
      preview: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        mp4_size: faker.number.int({ min: 10000 }),
        mp4: faker.image.url(),
      },
      preview_gif: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      preview_webp: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      source: {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
      "480w_still": {
        height: faker.number.int({ min: 1, max: 1000 }),
        width: faker.number.int({ min: 1, max: 1000 }),
        size: faker.number.int({ min: 10000 }),
        url: faker.image.url(),
      },
    },
    user:
      idx % 2 === 0
        ? undefined
        : {
            id: faker.number.int(),
            avatar_url: faker.image.url(),
            banner_image: faker.image.url(),
            banner_url: faker.image.url(),
            profile_url: faker.internet.url(),
            username: faker.string.sample(),
            display_name: faker.lorem.words(2),
            name: faker.lorem.words(2),
            attribution_display_name: faker.lorem.words(2),
            description: faker.internet.url(),
            user_type: "partner",
            facebook_url: faker.internet.url(),
            instagram_url: faker.internet.url(),
            twitter_url: faker.internet.url(),
            twitter: faker.lorem.word(),
            tumblr_url: faker.internet.url(),
            website_url: faker.internet.url(),
            website_display_url: faker.internet.url(),
            is_public: faker.datatype.boolean(),
            is_staff: faker.datatype.boolean(),
            is_superuser: faker.datatype.boolean(),
            is_verified: faker.datatype.boolean(),
            suppress_chrome: faker.datatype.boolean(),
          },
    has_attribution: false,
    alt_text: faker.lorem.words(),
  };
}
const data: GifResponse[] = new Array(10).fill(null).map(createGif);

startServer([
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/gifs/trending`, () =>
    HttpResponse.json({
      data,
      pagination: {
        total_count: 40,
        count: 10,
        offset: 1,
      },
      meta: {
        status: 200,
        msg: "OK",
        response_id: "test",
      },
    }),
  ),
]);

describe("Test gift list component", () => {
  beforeAll(() => {
    vi.spyOn(HTMLElement.prototype, "offsetHeight", "get").mockReturnValue(200);
    vi.spyOn(HTMLElement.prototype, "offsetWidth", "get").mockReturnValue(200);
    vi.mock("@mantine/hooks", () => ({
      useElementSize: () => ({
        height: 1440,
        width: 900,
        ref: null,
      }),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("Gif list will be able to show infinite gifs", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <GifList id="gift-list-test" fetchGifList={(payload) => service.getTrendingGifs(payload)} />
      </Providers>,
    );
    const firstItem = data[0];
    const firstGifItem = await screen.findByAltText(firstItem.alt_text);
    await user.click(firstGifItem);
    if (firstItem.user) expect(await screen.findByText(firstItem.user.display_name)).toBeDefined();
    else expect(await screen.findByText(firstItem.tags.join(" "))).toBeDefined();

    const secondItem = data[1];
    const secondGifItem = await screen.findByAltText(secondItem.alt_text);
    await user.click(secondGifItem);
    if (secondItem.user) expect(await screen.findByText(secondItem.user.display_name)).toBeDefined();
    else expect(await screen.findByText(secondItem.tags.join(" "))).toBeDefined();
  });
});
