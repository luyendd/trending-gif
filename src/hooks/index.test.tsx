import React from "react";
import { describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useInfiniteLoadHandler from "./useInfiniteLoadHandler";

describe("Test hook useInfiniteLoadHandler", () => {
  test("should work correctly", () => {
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
    const { rerender } = renderHook(() => {
      const useLastRef = useInfiniteLoadHandler({
        isFetching: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage,
      });
      useLastRef(mHTMLDivElement);
    });
    expect(mIntersectionObserver).toBeCalledWith(expect.any(Function));
    waitFor(() => {
      expect(fetchNextPage).toBeCalledTimes(1);
      expect(mObserver.disconnect).toBeCalled();
    });

    rerender({ isFetching: false, isFetchingNextPage: true, hasNextPage: true, fetchNextPage });
    waitFor(() => {
      expect(fetchNextPage).not.toBeCalled();
    });

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
    waitFor(() => {
      expect(fetchNextPage).not.toBeCalled();
    });
  });
});
