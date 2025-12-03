import { ApiResponse } from "@/types/Api.type"
import { LikesListResponse } from "@/types/Like.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getPostLikesById } from "../services/likeService"

export function usePostLikesById(
  id: number = 1,
  page: number = 1,
  limit: number = 10
) {
  return useQuery<LikesListResponse, Error>({
    queryKey: ["postlikeid", id,page,limit],
    queryFn: async () => {
      const res: ApiResponse<LikesListResponse> =
        await getPostLikesById(id,page, limit)

      return res.data 
    },
    placeholderData: keepPreviousData,
  })
}