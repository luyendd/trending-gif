import { ApiResponse } from "@/services/type";

// Calculate offset needed for the next page request
export function handleNextPageParam(lastPage: ApiResponse<unknown>) {
  if (!lastPage.pagination) return undefined;
  const { offset, count } = lastPage.pagination;
  if (count === 0) return undefined;

  return offset + count;
}
