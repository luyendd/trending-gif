import { ApiResponse } from "@/services/type";

// Calculate offset needed for the next page request
export function handleNextPageParam(lastPage: ApiResponse<unknown>) {
  if (!lastPage.pagination) return undefined;
  const { offset, count, total_count } = lastPage.pagination;
  if (offset * count === total_count) return undefined;

  return offset + count;
}
