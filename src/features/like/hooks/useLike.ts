import { ApiResponse } from "@/types/Api.type";
import { LikesListResponse } from "@/types/Like.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteLike,
  getPostLikesById,
  postLike,
} from "../services/likeService";

export function usePostLikesById(
  id: number = 1,
  page: number = 1,
  limit: number = 10
) {
  return useQuery<LikesListResponse, Error>({
    queryKey: ["postlikeid", id, page, limit],
    queryFn: async () => {
      const res: ApiResponse<LikesListResponse> = await getPostLikesById(
        id,
        page,
        limit
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}

export const usePostLike = () => {
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["feeds"] });
  };
  const postLikeMutation = useMutation({
    mutationFn: (id: number) => postLike(id),
    onSuccess: handleSuccess,
  });

  const deleteLikeMutation = useMutation({
    mutationFn: (id: number) => deleteLike(id),
    onSuccess: handleSuccess,
  });

  const isLoading = postLikeMutation.isPending || deleteLikeMutation.isPending;
  const isError = postLikeMutation.isError || deleteLikeMutation.isError;
  const errorMessage =
    postLikeMutation.error?.message || deleteLikeMutation.error?.message || "";

  return {
    postLikeMutation,
    deleteLikeMutation,
    isLoading,
    isError,
    errorMessage,
  };
};
