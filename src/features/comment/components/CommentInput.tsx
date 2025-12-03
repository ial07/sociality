// src/components/common/CommentInput.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { usePostComment } from "../hooks/useComment";

interface CommentInputProps {
  postId: number;
  onCommentPosted?: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  postId,
  onCommentPosted,
}) => {
  const [commentText, setCommentText] = useState("");

  const { postCommentMutation } = usePostComment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedText = commentText.trim();

    if (!trimmedText) {
      toast.error("Comment cannot be empty.");
      return;
    }

    postCommentMutation.mutate(
      {
        id: postId,
        text: trimmedText,
      },
      {
        onSuccess: () => {
          toast.success(postCommentMutation.data?.message);
          setCommentText("");
          onCommentPosted?.();
        },
        onError: () => {
          toast.error(postCommentMutation.error?.message);
        },
      }
    );
  };

  const isPosting = postCommentMutation.isPending;
  const isDisabled = isPosting || commentText.trim() === "";

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          disabled={isPosting}
          className="w-full h-12 rounded-xl border border-neutral-900 bg-neutral-950 pl-5 pr-24 focus:border-primary-300 focus:outline-none"
        />

        <Button
          type="submit"
          variant={"link"}
          disabled={isDisabled}
          className="absolute -right-5 top-1/2 -translate-1/2"
        >
          {isPosting ? "Sending..." : "Post"}
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
