import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostCreationPayload } from "@/types/Post.type";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/Api.type";
import { Feed } from "@/types/Feed.type";
import { createPost } from "../services/postService";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postMutation = useMutation<
    ApiResponse<Feed>,
    ApiResponse<null>,
    PostCreationPayload
  >({
    mutationFn: createPost,

    onSuccess: (data) => {
      const successMessage = data.message || "Post created successfully!";
      toast.success(successMessage);

      queryClient.invalidateQueries({ queryKey: ["feeds"] });
      queryClient.invalidateQueries({ queryKey: ["profileMes"] });

      router.push(`/`);
    },

    onError: (error) => {
      const errorMessage = error.message || "Failed to create post.";
      toast.error(errorMessage);
    },
  });

  return {
    postMutation,
    isLoading: postMutation.isPending,
    isError: postMutation.isError,
    errorMessage: postMutation.error?.message,
  };
};
