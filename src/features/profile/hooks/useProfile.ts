import { ApiResponse } from "@/types/Api.type"
import { FeedsListResponse } from "@/types/Feed.type"
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe, getMePost, updateProfile } from "../services/profileService"
import { ProfileResponse, UpdateProfilePayload } from "@/types/Profile.type"
import { Author } from "next/dist/lib/metadata/types/metadata-types"
import { toast } from "react-toastify"



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


export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const editProfileMutation = useMutation<
    ApiResponse<Author>, 
    Error,              
    UpdateProfilePayload
  >({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      const message = data.message || "Profile updated successfully!";
      toast.success(message);

      queryClient.invalidateQueries({ queryKey: ["profileme"] });
      queryClient.invalidateQueries({ queryKey: ["profilemes"] }); 


    },
    onError: (error: any) => {
      const errMsg = error.message || "Failed to update profile.";
      toast.error(errMsg);
    },
  });

  return {
    editProfileMutation,
    isLoading: editProfileMutation.isPending,
  };
};