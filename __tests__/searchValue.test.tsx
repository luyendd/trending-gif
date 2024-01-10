import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import RootLayout from "@/app/layout";
import SearchValuePage from "@/app/search/[searchValue]/page";

test("Search Value Page", () => {
  render(
    <RootLayout>
      <SearchValuePage params={{ searchValue: "test" }} />
    </RootLayout>,
  );
  expect(screen.getByRole("heading", { level: 1, name: "Gifs for test" })).toBeDefined();
});
