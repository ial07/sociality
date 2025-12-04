import { ApiResponse } from "@/types/Api.type";
import { CommentPayload, CommentsListResponse } from "@/types/Comment.type";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getPostCommentsById, postComment } from "../services/commentService";

export function usePostCommentsById(
  id: number = 1,
  isOpen: boolean,
  page: number = 1,
  limit: number = 10, 
) {
  return useQuery<CommentsListResponse, Error>({
    queryKey: ["postcommentid", id, page, limit],
    queryFn: async () => {
      console.log("🚀 [DEBUG] Fetching Comments with params:", { id, page, limit });
      const res: ApiResponse<CommentsListResponse> = await getPostCommentsById(
        id,
        page,
        limit
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: isOpen && !!id,
  });
}

export const usePostComment = () => {
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["feeds"] });
    queryClient.invalidateQueries({ queryKey: ["postcommentid"] });
  };
  const postCommentMutation = useMutation({
    mutationFn: (payload: CommentPayload) => postComment(payload),
    onSuccess: handleSuccess,
  });

  return {
    postCommentMutation,
  };
};
