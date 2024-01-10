import { vi } from "vitest";
import "intersection-observer";
global.ResizeObserver = require("resize-observer-polyfill");

vi.mock("next/font/google", () => ({
  Inter: function () {
    return {
      className: "",
      style: {
        fontFamily: "next/font/google",
      },
    };
  },
}));

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: () => null,
    };
  },
  useParams() {
    return {};
  },
}));
