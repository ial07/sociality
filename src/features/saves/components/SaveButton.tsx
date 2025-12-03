"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { usePostSave } from "../hooks/useSaves";

interface SaveButtonProps {
  postId: number;
  isBookmarked: boolean;
}

const SaveButton: React.FC<SaveButtonProps> = ({ postId, isBookmarked }) => {
  const { postSaveMutation, deleteSaveMutation, isLoading } = usePostSave();

  const mutation = isBookmarked ? deleteSaveMutation : postSaveMutation;

  const handleToggleBookmark = () => {
    if (isLoading) return;

    mutation.mutate(postId, {
      onSuccess: () => {},
      onError: (error) => {
        toast.error(
          error.message || `Failed to ${isBookmarked ? "unsave" : "save"} post.`
        );
      },
    });
  };

  const IconComponent = isBookmarked
    ? "prime:bookmark-fill"
    : "circum:bookmark";
  const iconColor = isBookmarked ? "text-primary" : "text-foreground";

  return (
    <button
      onClick={handleToggleBookmark}
      disabled={isLoading}
      className={`p-0 focus:outline-none transition-transform duration-150 ${
        !isLoading && "hover:scale-110"
      } ${isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
      aria-label={isBookmarked ? "Unsave post" : "Save post"}
    >
      <Icon icon={IconComponent} width="24" height="24" className={iconColor} />
    </button>
  );
};

export default SaveButton;
