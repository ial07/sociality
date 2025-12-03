import { ApiResponse } from "@/types/Api.type";
import { PostListResponse } from "@/types/Feed.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteSave, getSavedMePost, postSave } from "../services/SavesService";

export function useSavedMePost(page: number = 1, limit: number = 10) {
  return useQuery<PostListResponse, Error>({
    queryKey: ["savedmeposts", page, limit],
    queryFn: async () => {
      const res: ApiResponse<PostListResponse> = await getSavedMePost(
        page,
        limit
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export const usePostSave = () => {
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["feeds"] });
  };
  const postSaveMutation = useMutation({
    mutationFn: (id: number) => postSave(id),
    onSuccess: handleSuccess,
  });

  const deleteSaveMutation = useMutation({
    mutationFn: (id: number) => deleteSave(id),
    onSuccess: handleSuccess,
  });

  const isLoading = postSaveMutation.isPending || deleteSaveMutation.isPending;
  const isError = postSaveMutation.isError || deleteSaveMutation.isError;
  const errorMessage =
    postSaveMutation.error?.message || deleteSaveMutation.error?.message || "";

  return {
    postSaveMutation,
    deleteSaveMutation,
    isLoading,
    isError,
    errorMessage,
  };
};
