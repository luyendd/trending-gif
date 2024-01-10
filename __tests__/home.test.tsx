import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Providers } from "@/providers";
import HomePage from "@/app/page";

test("Home Page", () => {
  render(
    <Providers>
      <HomePage />
    </Providers>,
  );
  expect(screen.getByRole("heading", { level: 1, name: "Trending Gifs" })).toBeDefined();
});
