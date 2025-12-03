import { ApiResponse } from "@/types/Api.type"
import { FeedsListResponse } from "@/types/Feed.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getFeeds } from "../services/feedService"

export function useFeeds(
  page: number = 1,
  limit: number = 10
) {
  return useQuery<FeedsListResponse, Error>({
    queryKey: ["feeds", page, limit],
    queryFn: async () => {
      const res: ApiResponse<FeedsListResponse> =
        await getFeeds( page, limit)

      return res.data 
    },
    placeholderData: keepPreviousData,
  })
}