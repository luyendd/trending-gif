import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Providers } from "@/providers";
import SearchValuePage from "@/app/search/[searchValue]/page";

test("Search Value Page", () => {
  render(
    <Providers>
      <SearchValuePage params={{ searchValue: "test" }} />
    </Providers>,
  );
  expect(screen.getByRole("heading", { level: 1, name: "Gifs for test" })).toBeDefined();
});
