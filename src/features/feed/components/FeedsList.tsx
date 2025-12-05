"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FeedCard from "./FeedCard";
import { useInfiniteFeeds } from "../hooks/useFeed";
import FeedSkeleton from "@/components/FeedSkeleton";

const FeedsList: React.FC = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFeeds();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2].map((i) => (
          <div key={i}>
            <FeedSkeleton />
            <hr className="border border-neutral-900 my-6" />
          </div>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) return <span className="text-red-500">{error.message}</span>;

  return (
    <div>
      {/* Render Data: TanStack Query mengelompokkan data per 'page' */}
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.items.map((feed) => (
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
              <hr className="border border-neutral-900 my-4 md:my-6" />
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}

      {/* Element Trigger untuk Load More */}
      <div ref={ref} className="mt-4">
        {/* Tampilkan Skeleton KETIKA sedang fetch halaman berikutnya */}
        {isFetchingNextPage && (
          <div>
            <FeedSkeleton />
            <hr className="border border-neutral-900 my-6" />
          </div>
        )}

        {/* Optional: Pesan jika data sudah habis */}
        {!hasNextPage && data && (
          <p className="text-center text-neutral-500 text-sm py-4">
            You've reached the end!
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedsList;
