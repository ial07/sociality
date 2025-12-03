import { ApiResponse } from "@/types/Api.type"
import { FeedsListResponse } from "@/types/Feed.type"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getMe, getMePost } from "../services/profileService"
import { ProfileResponse } from "@/types/Profile.type"



export function useProfileMe(
) {
  return useQuery<ProfileResponse, Error>({
    queryKey: ["profileme"],
    queryFn: async () => {
      const res: ApiResponse<ProfileResponse> =
        await getMe()

      return res.data 
    },
    placeholderData: keepPreviousData,
  })
}


export function useProfileMePost(
  page: number = 1,
  limit: number = 10
) {
  return useQuery<FeedsListResponse, Error>({
    queryKey: ["profilemes", page, limit],
    queryFn: async () => {
      const res: ApiResponse<FeedsListResponse> =
        await getMePost( page, limit)

      return res.data 
    },
    placeholderData: keepPreviousData,
  })
}