import EmptyData from "@/components/EmptyData";
import { Button } from "@/components/ui/button";
import { Feed, FeedsListResponse, PostListResponse } from "@/types/Feed.type";
import Image from "next/image";
import React from "react";

type ListProfilePostProps = {
  data: FeedsListResponse | PostListResponse | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
};

const ListProfilePost: React.FC<ListProfilePostProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
}) => {
  let postsContent: Feed[] = [];
  console.log(data);

  if (data !== null)
    if ("items" in data) {
      postsContent = data.items;
    } else if ("posts" in data) {
      postsContent = data.posts;
    }

  if (postsContent.length == 0) return <EmptyData />;

  if (isError) return <span>{errorMessage}</span>;

  if (isLoading || !data) return <span>Loading...</span>;

  return (
    <div className="grid grid-cols-3 gap-1">
      {postsContent.map((p) => (
        <Image
          src={p.imageUrl}
          alt={p.author.name}
          width={500}
          height={500}
          unoptimized
          className="aspect-square object-cover rounded-sm"
        />
      ))}
    </div>
  );
};

export default ListProfilePost;
