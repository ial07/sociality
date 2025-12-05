"use client";

import { Button } from "@/components/ui/button";
import { useFollow } from "@/features/follow/hooks/useFollow"; // Sesuaikan path import hook kamu
import { FollowPayload } from "@/types/Follow.ts";
import { CheckCircle2 } from "lucide-react";
import React from "react";

interface FollowButtonProps {
  targetUsername: string;
  isFollowing: boolean;
}

const FollowButton: React.FC<FollowButtonProps> = ({
  targetUsername,
  isFollowing,
}) => {
  const { followMutation, unfollowMutation, isLoading } = useFollow();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const payload: FollowPayload = { username: targetUsername };

    if (isFollowing) {
      unfollowMutation.mutate(payload);
    } else {
      followMutation.mutate(payload);
    }
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      disabled={isLoading}
      onClick={handleToggle}
      className={`rounded-full min-w-[100px] transition-colors duration-200 ${
        isFollowing
          ? "text-foreground border-neutral-700 hover:bg-neutral-800" // Style Following
          : "bg-primary-300 hover:bg-primary-200 text-white" // Style Follow
      }`}
    >
      {isLoading ? (
        "Loading..."
      ) : isFollowing ? (
        <span className="flex-center gap-2">
          <CheckCircle2 /> Following
        </span>
      ) : (
        "Follow"
      )}
    </Button>
  );
};

export default FollowButton;
