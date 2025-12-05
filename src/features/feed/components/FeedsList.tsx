"use client";

import React from "react";
import FeedCard from "./FeedCard";
import { useFeeds } from "../hooks/useFeed";

const FeedsList: React.FC = () => {
  const { data, isLoading, isError, error } = useFeeds();

  if (isError) return <span>{error.message}</span>;
  return (
    <div>
      {data?.items.map((feed, index) => (
        <React.Fragment key={feed.id}>
          <FeedCard
            id={feed.id}
            authorName={feed.author?.name}
            username={feed.author?.username}
            authorAvatarUrl={feed.author?.avatarUrl}
            timeAgo={feed.createdAt}
            feedImageUrl={feed.imageUrl}
            captionText={feed.caption}
            likesCount={feed.likeCount}
            commentsCount={feed.commentCount}
            sharesCount={feed.likeCount}
            isLiked={feed.likedByMe}
            isBookmarked={feed.likedByMe}
          />

          <hr className="border border-neutral-900 my-4 md:my-6 last:hidden" />
        </React.Fragment>
      ))}
    </div>
  );
};

export default FeedsList;
