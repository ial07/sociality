"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { usePostLike } from "../hooks/useLike";

interface LikeButtonProps {
  postId: number;
  isLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, isLiked }) => {
  const { postLikeMutation, deleteLikeMutation, isLoading } = usePostLike();

  const mutation = isLiked ? deleteLikeMutation : postLikeMutation;

  const handleToggleLike = () => {
    if (isLoading) return;

    mutation.mutate(postId, {
      onSuccess: () => {},
      onError: (error) => {
        // Tampilkan error jika gagal
        toast.error(
          error.message || `Failed to ${isLiked ? "unlike" : "like"} post.`
        );
      },
    });
  };

  // Tentukan tampilan icon dan warna berdasarkan state
  const IconComponent = isLiked ? "tabler:heart-filled" : "solar:heart-linear";
  const iconColor = isLiked ? "text-danger" : "text-foreground";

  return (
    <button
      onClick={handleToggleLike}
      disabled={isLoading}
      className={`p-0 focus:outline-none transition-transform duration-150 ${
        !isLoading && "hover:scale-110"
      } ${isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      aria-label={isLiked ? "Unlike post" : "Like post"}
    >
      <Icon icon={IconComponent} width="24" height="24" className={iconColor} />
    </button>
  );
};

export default LikeButton;
