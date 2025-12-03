import { ApiResponse } from "@/types/Api.type"
import { PostListResponse } from "@/types/Feed.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getSavedMePost } from "../services/SavesService"



export function useSavedMePost(
  page: number = 1,
  limit: number = 10
) {
  return useQuery<PostListResponse, Error>({
    queryKey: ["savedmeposts", page, limit],
    queryFn: async () => {
      const res: ApiResponse<PostListResponse> =
        await getSavedMePost(page, limit)

      return res.data 
    },
    placeholderData: keepPreviousData,
  })
}