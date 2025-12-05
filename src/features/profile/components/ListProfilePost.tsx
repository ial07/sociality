import EmptyData from "@/components/EmptyData";
import CommentCountModal from "@/features/comment/components/CommentCoundModal";
import { Feed, FeedsListResponse, PostListResponse } from "@/types/Feed.type";
import Image from "next/image";
import React from "react";

type ListProfilePostProps = {
  data: FeedsListResponse | PostListResponse | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  isOwnProfile: boolean;
};

const ListProfilePost: React.FC<ListProfilePostProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
  isOwnProfile,
}) => {
  let postsContent: Feed[] = [];

  if (data !== null)
    if ("items" in data) {
      postsContent = data.items;
    } else if ("posts" in data) {
      postsContent = data.posts;
    }

  if (postsContent.length == 0)
    return <EmptyData isOwnProfile={isOwnProfile} />;

  if (isError) return <span>{errorMessage}</span>;

  if (isLoading || !data) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-3 gap-1">
      {postsContent.map(
        (p) =>
          !isLoading && (
            <CommentCountModal
              key={p.id}
              id={p.id}
              commentsCount={p.commentCount}
              authorName={p.author?.name}
              authorAvatarUrl={p.author?.avatarUrl ?? "/images/author.png"}
              timeAgo={p.createdAt}
              feedImageUrl={p.imageUrl}
              captionText={p.caption}
              trigger={
                <Image
                  src={p.imageUrl}
                  alt={p.author?.name ?? ""}
                  width={500}
                  height={500}
                  unoptimized
                  className="aspect-square object-cover rounded-sm cursor-pointer"
                />
              }
            />
          )
      )}
    </div>
  );
};

export default ListProfilePost;
