import { ApiResponse } from "@/types/Api.type";
import { Author } from "next/dist/lib/metadata/types/metadata-types";
import { toast } from "react-toastify";
import { follow, unfollow } from "../services/followService";
import { FollowPayload } from "@/types/Follow.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useFollow = () => {
  const queryClient = useQueryClient();
  const handleSuccess = (data:ApiResponse<Author>) => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
     const successMessage = data.message || "Following"; 
      toast.success(successMessage)
  };
  const followMutation = useMutation<ApiResponse<Author>, Error,FollowPayload>({
    mutationFn: follow,
    onSuccess: handleSuccess
  });

  const unfollowMutation = useMutation<ApiResponse<Author>, Error,FollowPayload>({
    mutationFn: unfollow,
    onSuccess: handleSuccess
  });

  const isLoading = followMutation.isPending || unfollowMutation.isPending;
  const isError = followMutation.isError || unfollowMutation.isError;
  const errorMessage =
    followMutation.error?.message || unfollowMutation.error?.message || "";

  return { followMutation, unfollowMutation, isLoading, isError, errorMessage };
};