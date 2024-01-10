import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useInfiniteLoadHandler from "./useInfiniteLoadHandler";

describe("Test hook useInfiniteLoadHandler", () => {
  const mObserver = {
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  };
  const mIntersectionObserver = vi.fn();
  mIntersectionObserver.mockImplementation((callback) => {
    callback([{ isIntersecting: true }], mObserver);
    return mObserver;
  });
  window.IntersectionObserver = mIntersectionObserver;
  const mHTMLDivElement = document.createElement("div");
  const fetchNextPage = vi.fn();

  beforeEach(() => {});

  test("should work correctly", async () => {
    renderHook(() => {
      const useLastRef = useInfiniteLoadHandler({
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage,
      });
      useLastRef(mHTMLDivElement);
    });
    expect(mIntersectionObserver).toBeCalledWith(expect.any(Function));
    await waitFor(() => {
      expect(fetchNextPage).toBeCalledTimes(1);
    });
  });

  test("should not call api if there is a loading", () => {
    renderHook(() => {
      const useLastRef = useInfiniteLoadHandler({
        isFetching: false,
        isFetchingNextPage: true,
        hasNextPage: true,
        fetchNextPage,
      });
      useLastRef(mHTMLDivElement);
    });
    expect(fetchNextPage).not.toBeCalled();
  });

  test("should not call api if it doesn't have next page", () => {
    vi.spyOn(React, "useRef").mockReturnValue({ current: mObserver });
    renderHook(() => {
      const useLastRef = useInfiniteLoadHandler({
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage,
      });
      useLastRef(mHTMLDivElement);
    });
    expect(mObserver.disconnect).toBeCalled();
    expect(mIntersectionObserver).toBeCalledWith(expect.any(Function));
    expect(fetchNextPage).not.toBeCalled();
  });
});
