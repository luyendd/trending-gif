import { afterAll, afterEach, beforeAll, test } from "vitest";
import { render } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { fetch } from "cross-fetch";

import GifList from ".";
import service from "@/services";
import { Providers } from "@/providers";

const data = {
  data: [
    {
      type: "gif",
      id: "WwP84kqXj0JxiXHSO2",
      index_id: 70833315,
      url: "https://giphy.com/gifs/arianagrande-ariana-grande-thank-u-next-you-WwP84kqXj0JxiXHSO2",
      slug: "arianagrande-ariana-grande-thank-u-next-you-WwP84kqXj0JxiXHSO2",
      bitly_gif_url: "https://gph.is/2BK5AAL",
      bitly_url: "https://gph.is/2BK5AAL",
      embed_url: "https://giphy.com/embed/WwP84kqXj0JxiXHSO2",
      username: "arianagrande",
      source: "https://www.youtube.com/watch?v=gl1aHhXnN1k",
      title: "thank you next legally blonde GIF by Ariana Grande",
      rating: "pg",
      content_url: "",
      tags: ["ariana grande", "legally blonde", "thank u next", "thank you next"],
      featured_tags: ["ariana grande", "thank u next"],
      user_tags: [],
      source_tld: "www.youtube.com",
      source_post_url: "https://www.youtube.com/watch?v=gl1aHhXnN1k",
      is_hidden: 0,
      is_removed: 0,
      is_community: 0,
      is_anonymous: 0,
      is_featured: 0,
      is_realtime: 0,
      is_sticker: 0,
      import_datetime: "2018-11-30 20:39:30",
      trending_datetime: "0000-00-00 00:00:00",
      create_datetime: "2018-11-30 20:39:41",
      update_datetime: "2018-11-30 22:43:28",
      images: {
        original: {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
          mp4_size: "231583",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
          webp_size: "455710",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.webp&ct=g",
          frames: "34",
          hash: "132ad22a6f3fe6ad14225ea3af618052",
        },
        downsized: {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
        },
        downsized_large: {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
        },
        downsized_medium: {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.gif&ct=g",
        },
        downsized_small: {
          height: "180",
          width: "432",
          mp4_size: "110170",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy-downsized-small.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy-downsized-small.mp4&ct=g",
        },
        downsized_still: {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g",
        },
        fixed_height: {
          height: "200",
          width: "480",
          size: "1498123",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200.gif&ct=g",
          mp4_size: "216898",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200.mp4&ct=g",
          webp_size: "455710",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200.webp&ct=g",
        },
        fixed_height_downsampled: {
          height: "200",
          width: "480",
          size: "290185",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200_d.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200_d.gif&ct=g",
          webp_size: "151646",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200_d.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200_d.webp&ct=g",
        },
        fixed_height_small: {
          height: "100",
          width: "240",
          size: "514778",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100.gif&ct=g",
          mp4_size: "98303",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100.mp4&ct=g",
          webp_size: "205850",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100.webp&ct=g",
        },
        fixed_height_small_still: {
          height: "100",
          width: "240",
          size: "17906",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100_s.gif&ct=g",
        },
        fixed_height_still: {
          height: "200",
          width: "480",
          size: "45955",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200_s.gif&ct=g",
        },
        fixed_width: {
          height: "83",
          width: "200",
          size: "350180",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w.gif&ct=g",
          mp4_size: "82328",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w.mp4&ct=g",
          webp_size: "166402",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w.webp&ct=g",
        },
        fixed_width_downsampled: {
          height: "83",
          width: "200",
          size: "74431",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w_d.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w_d.gif&ct=g",
          webp_size: "36590",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w_d.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w_d.webp&ct=g",
        },
        fixed_width_small: {
          height: "42",
          width: "100",
          size: "97446",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100w.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100w.gif&ct=g",
          mp4_size: "30509",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100w.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100w.mp4&ct=g",
          webp_size: "64648",
          webp: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100w.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100w.webp&ct=g",
        },
        fixed_width_small_still: {
          height: "42",
          width: "100",
          size: "4064",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/100w_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=100w_s.gif&ct=g",
        },
        fixed_width_still: {
          height: "83",
          width: "200",
          size: "13020",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/200w_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=200w_s.gif&ct=g",
        },
        looping: {
          mp4_size: "1430774",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy-loop.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy-loop.mp4&ct=g",
        },
        original_still: {
          height: "200",
          width: "480",
          size: "62247",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy_s.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy_s.gif&ct=g",
        },
        original_mp4: {
          height: "200",
          width: "480",
          mp4_size: "231583",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy.mp4&ct=g",
        },
        preview: {
          height: "140",
          width: "336",
          mp4_size: "38516",
          mp4: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy-preview.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy-preview.mp4&ct=g",
        },
        preview_gif: {
          height: "59",
          width: "142",
          size: "48968",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy-preview.gif?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy-preview.gif&ct=g",
        },
        preview_webp: {
          height: "74",
          width: "178",
          size: "41882",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/giphy-preview.webp?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=giphy-preview.webp&ct=g",
        },
        source: {
          height: "200",
          width: "480",
          size: "255240",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/source.mp4?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=source.mp4&ct=g",
        },
        "480w_still": {
          height: "200",
          width: "480",
          size: "1955536",
          url: "https://media4.giphy.com/media/WwP84kqXj0JxiXHSO2/480w_s.jpg?cid=ecf05e47dr17udd5ykgsjpjr8a1xrdcmnq28am38fvwl4kxv&ep=v1_gifs_trending&rid=480w_s.jpg&ct=g",
        },
      },
      user: {
        id: 52516,
        avatar_url: "https://media4.giphy.com/avatars/arianagrande/7qkC0dtltRKI.jpg",
        banner_image: "https://media4.giphy.com/headers/arianagrande/75E6ewcUneJT.jpg",
        banner_url: "https://media4.giphy.com/headers/arianagrande/75E6ewcUneJT.jpg",
        profile_url: "https://giphy.com/arianagrande/",
        username: "arianagrande",
        display_name: "Ariana Grande",
        name: "Ariana Grande",
        attribution_display_name: "Ariana Grande",
        description: "https://www.arianagrande.com/",
        user_type: "partner",
        facebook_url: "https://www.facebook.com/arianagrande",
        instagram_url: "https://instagram.com/arianagrande",
        twitter_url: "https://twitter.com/arianagrande",
        twitter: "arianagrande",
        tumblr_url: "",
        website_url: "https://www.arianagrande.com/",
        website_display_url: "www.arianagrande.com",
        is_public: true,
        is_staff: false,
        is_superuser: false,
        is_verified: true,
        suppress_chrome: true,
      },
      analytics_response_payload:
        "e=Z2lmX2lkPVd3UDg0a3FYajBKeGlYSFNPMiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZWNmMDVlNDdkcjE3dWRkNXlrZ3NqcGpyOGExeHJkY21ucTI4YW0zOGZ2d2w0a3h2JmN0PWc",
      analytics: {
        onload: {
          url: "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVd3UDg0a3FYajBKeGlYSFNPMiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZWNmMDVlNDdkcjE3dWRkNXlrZ3NqcGpyOGExeHJkY21ucTI4YW0zOGZ2d2w0a3h2JmN0PWc&action_type=SEEN",
        },
        onclick: {
          url: "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVd3UDg0a3FYajBKeGlYSFNPMiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZWNmMDVlNDdkcjE3dWRkNXlrZ3NqcGpyOGExeHJkY21ucTI4YW0zOGZ2d2w0a3h2JmN0PWc&action_type=CLICK",
        },
        onsent: {
          url: "https://giphy-analytics.giphy.com/v2/pingback_simple?analytics_response_payload=e%3DZ2lmX2lkPVd3UDg0a3FYajBKeGlYSFNPMiZldmVudF90eXBlPUdJRl9UUkVORElORyZjaWQ9ZWNmMDVlNDdkcjE3dWRkNXlrZ3NqcGpyOGExeHJkY21ucTI4YW0zOGZ2d2w0a3h2JmN0PWc&action_type=SENT",
        },
      },
      has_attribution: false,
      alt_text: "",
    },
  ],
  pagination: {
    total_count: 1,
    count: 1,
    offset: 1,
  },
  meta: {
    status: 200,
    msg: "OK",
    response_id: "test",
  },
};

global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
global.fetch = fetch;

const server = setupServer(
  http.get("/gifs/trending", () => {
    return HttpResponse.json(data);
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: `error` }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Gif list will be able to show gif", async () => {
  render(
    <Providers>
      <GifList id="test" fetchGifList={(payload) => service.getTrendingGifs(payload)} />
    </Providers>,
  );
});
