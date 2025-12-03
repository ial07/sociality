"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import LikeCountModal from "@/features/like/components/LikeCountModal";
import { usePostLikesById } from "@/features/like/hooks/useLike";
import { usePostCommentsById } from "@/features/comment/hooks/useComment";
import CommentCountModal from "@/features/comment/components/CommentCoundModal";

interface FeedCardProps {
  id: number;
  authorName: string;
  authorAvatarUrl?: string;
  timeAgo: string;
  feedImageUrl: string;
  captionText: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const MAX_HEIGHT_SHORT_TEXT = 40;
const MAX_CAPTION_LENGTH = 150;

const FeedCard: React.FC<FeedCardProps> = ({
  id,
  authorName,
  authorAvatarUrl,
  timeAgo,
  feedImageUrl,
  captionText,
  likesCount,
  commentsCount,
  sharesCount,
  isLiked,
  isBookmarked,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const captionRef = useRef<HTMLParagraphElement>(null);

  const { data: mockLikeList, isLoading: isLoadingLike } = usePostLikesById(id);
  const { data: mockCommentList, isLoading: isLoadingComment } =
    usePostCommentsById(id);

  useEffect(() => {
    if (captionRef.current) {
      const isContentOverflowing =
        captionRef.current.scrollHeight > captionRef.current.clientHeight ||
        captionText.length > MAX_CAPTION_LENGTH;

      setShowMoreButton(isContentOverflowing);
    }
  }, [captionText]);

  const displayedCaption =
    isExpanded || !showMoreButton
      ? captionText
      : captionText.substring(0, MAX_CAPTION_LENGTH) + "...";

  return (
    <div className="bg-neutral-950 rounded-xl">
      <div className="flex-start gap-2 md:gap-3 mb-2 md:mb-4">
        <Image
          src={authorAvatarUrl ?? "/images/author.png"}
          alt={authorName}
          width={64}
          height={64}
          className="size-11 md:size-16 rounded-full object-cover"
          unoptimized
        />
        <div>
          <h3 className="text-sm-bold md:text-md-bold text-foreground">
            {authorName}
          </h3>
          <p className="text-xs-regular md:text-sm-regular text-neutral-400">
            {timeAgo}
          </p>
        </div>
      </div>

      {/* FEED IMAGE */}
      <div className="w-full rounded-md overflow-hidden mb-2 md:mb-3 aspect-square">
        <Image
          src={feedImageUrl}
          alt="feed"
          width={600}
          height={600}
          unoptimized
          className="object-cover h-full w-full"
        />
      </div>

      <div className="flex-between mb-3 md:mb-2">
        <div className="flex-start gap-4">
          <div className="flex-start gap-1.5 cursor-pointer">
            <Icon
              icon={isLiked ? "tabler:heart-filled" : "solar:heart-linear"}
              width="24"
              height="24"
              className={isLiked ? "text-danger" : "text-foreground"}
            />
            {!isLoadingLike && (
              <LikeCountModal
                likesCount={likesCount}
                likeList={mockLikeList!} // Gunakan data dari API
                trigger={
                  <span className="text-sm-semibold md:text-md-semibold cursor-pointer">
                    {likesCount}
                  </span>
                }
              />
            )}
          </div>
          {/* COMMENT */}
          <div className="flex-start gap-1.5 cursor-pointer">
            {!isLoadingComment && (
              <CommentCountModal
                id={id}
                commentsCount={commentsCount}
                commentList={mockCommentList!}
                authorName={authorName}
                authorAvatarUrl={authorAvatarUrl ?? "/images/author.png"}
                timeAgo={timeAgo}
                feedImageUrl={feedImageUrl}
                captionText={captionText}
                trigger={
                  <div className="flex gap-2">
                    <Icon icon="mage:message-dots" width="24" height="24" />
                    <span className="text-sm-semibold md:text-md-semibold cursor-pointer">
                      {commentsCount}
                    </span>
                  </div>
                }
              />
            )}
          </div>
          {/* SHARE */}
          <div className="flex-start gap-1.5 cursor-pointer">
            <Icon icon="bitcoin-icons:share-outline" width="24" height="24" />
            <span className="text-sm-semibold md:text-md-semibold">
              {sharesCount}
            </span>
          </div>
        </div>

        <div className="cursor-pointer">
          <Icon
            icon={isBookmarked ? "prime:bookmark-fill" : "circum:bookmark"}
            width="24"
            height="24"
            className={isBookmarked ? "text-primary" : "text-foreground"}
          />
        </div>
      </div>

      {/* CAPTION/TEXT CONTENT */}
      <div>
        <h3 className="text-sm-bold md:text-md-bold text-foreground mb-1">
          {authorName}
        </h3>
        {/* Paragraf Utama: Dipotong menggunakan logika state */}
        <p
          ref={captionRef}
          className={`text-sm-regular md:text-md-regular text-foreground ${
            !isExpanded && showMoreButton ? "max-h-[3rem] overflow-hidden" : ""
          }`}
        >
          {displayedCaption}
        </p>

        {showMoreButton && !isExpanded && (
          <Button
            size={"sm"}
            variant={"link"}
            className="p-0 h-auto text-primary-300"
            onClick={() => setIsExpanded(true)}
          >
            Show More
          </Button>
        )}

        {showMoreButton && isExpanded && (
          <Button
            size={"sm"}
            variant={"link"}
            className="p-0 h-auto text-primary-300"
            onClick={() => setIsExpanded(false)}
          >
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
