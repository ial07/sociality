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
  page: number = 1,
  limit: number = 10
) {
  return useQuery<CommentsListResponse, Error>({
    queryKey: ["postcommentid", id, page, limit],
    queryFn: async () => {
      const res: ApiResponse<CommentsListResponse> = await getPostCommentsById(
        id,
        page,
        limit
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
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
