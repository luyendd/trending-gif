import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import RootLayout from "@/app/layout";
import HomePage from "@/app/page";

test("Home Page", () => {
  render(
    <RootLayout>
      <HomePage />
    </RootLayout>,
  );
  expect(screen.getByRole("heading", { level: 1, name: "Trending Gifs" })).toBeDefined();
});
