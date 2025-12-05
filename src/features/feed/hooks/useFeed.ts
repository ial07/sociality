// src/features/feed/hooks/useFeed.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeeds } from "../services/feedService";
import { ApiResponse } from "@/types/Api.type";
import { FeedsListResponse } from "@/types/Feed.type";

export function useInfiniteFeeds(limit: number = 10) {
  return useInfiniteQuery<FeedsListResponse, Error>({
    queryKey: ["feeds", "infinite"],
    queryFn: async ({ pageParam = 1 }) => {
      const res: ApiResponse<FeedsListResponse> = await getFeeds(
        pageParam as number,
        limit
      );
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });
}
