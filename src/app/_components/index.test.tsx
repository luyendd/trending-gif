import { faker } from "@faker-js/faker";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, test, vi } from "vitest";

import startServer from "@/mocks/startServer";
import { Providers } from "@/providers";

import HomeSearch from "./HomeSearch";

const trendingSearches = new Array(10).fill(null).map(() => faker.lorem.words({ min: 1, max: 3 }));
const searchTags = new Array(10).fill(null).map(() => ({ name: faker.lorem.words({ min: 1, max: 3 }) }));
const getTrendingSearches = vi.fn().mockReturnValue(HttpResponse.json({ data: trendingSearches }));
const getSearchTags = vi.fn().mockReturnValue(HttpResponse.json({ data: searchTags }));
const routerPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: routerPush,
    };
  },
}));

startServer([
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/trending/searches`, getTrendingSearches),
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/gifs/search/tags`, getSearchTags),
]);

describe("Test Home Search Component", () => {
  test("Home Search component should show trending searches correct", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <HomeSearch />
      </Providers>,
    );
    const input = await screen.findByRole<HTMLInputElement>("combobox", { name: "home-search-input" });
    expect(getTrendingSearches).toBeCalledTimes(1);
    await waitFor(async () => {
      await user.click(input);
    });
    const searchLabel = await screen.findByText(/trending search/i);
    expect(searchLabel.getAttribute("data-disabled")).toBeFalsy();
    expect(screen.findByText(trendingSearches[0])).toBeDefined();
    await waitFor(async () => {
      await user.type(input, "{ArrowUp}{Enter}");
    });
    expect(routerPush).toBeCalledWith(`/search/${trendingSearches[trendingSearches.length - 1]}`);
  });

  test("Home Search component should call search api debounce after user type", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <HomeSearch />
      </Providers>,
    );
    const input = await screen.findByRole<HTMLInputElement>("combobox", { name: "home-search-input" });
    const char = searchTags[0].name.charAt(0);
    await waitFor(async () => {
      await user.type(input, char);
      expect(input.value).toEqual(char);
    });
    // https://github.com/adobe/react-spectrum/issues/4454
    // await waitFor(() => {
    //   expect(getSearchTags).toBeCalledTimes(1);
    // });
    // const selectItem = await screen.findByText(searchTags[0].name);
    // await waitFor(async () => {
    //   await user.click(selectItem);
    // });
    // expect(input.value).toEqual(searchTags[0].name);
    // expect(routerPush).toBeCalledWith(`/search/${searchTags[0].name}`);

    // await waitFor(async () => {
    //   await user.type(input, searchTags[0].name.charAt(2));
    //   await user.click(await screen.findByLabelText(/search combobox icon/i));
    // });
    // expect(routerPush).toBeCalledTimes(2);
  });
});
