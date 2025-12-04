// src/components/Feed/CommentListContainer.tsx (Komponen Baru)
"use client";

import React from "react";
import { Comment } from "@/types/Comment.type";
import Image from "next/image";
import CommentInput from "./CommentInput";
import { Icon } from "@iconify/react";
import { usePostCommentsById } from "../hooks/useComment";

interface CommentListContainerProps {
  id: number;
  commentsCount: number;
  authorName: string;
  authorAvatarUrl: string;
  timeAgo: string;
  feedImageUrl: string;
  captionText: string;
}

// --- Sub-komponen kecil untuk render item list ---
const CommentsListContent: React.FC<{ commentList: Comment[] }> = ({
  commentList,
}) => (
  <div className="w-full">
    {commentList.map((item) => (
      <div key={item.id} className="w-full mb-3">
        <div className="flex gap-3 items-center">
          <Image
            src={item.author.avatarUrl ?? "/images/author.png"}
            alt={item.author.name}
            width={40}
            height={40}
            className="rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-grow">
            <h3 className="text-sm-bold md:text-md-bold text-foreground">
              {item.author.name}
            </h3>
            <p className="text-xs-regular md:text-sm-regular text-neutral-400">
              {item.createdAt}
            </p>
          </div>
        </div>
        <p className="text-xs-regular md:text-sm-regular mt-1 ml-12">
          {item.text}
        </p>
        <hr className="border border-neutral-900 mt-3" />
      </div>
    ))}
  </div>
);

// --- Komponen Container Utama ---
const CommentListContainer: React.FC<CommentListContainerProps> = ({
  id,
  commentsCount,
  authorName,
  authorAvatarUrl,
  timeAgo,
  feedImageUrl,
  captionText,
}) => {
  const { data: commentData, isLoading } = usePostCommentsById(id, true);

  const safeCommentList: Comment[] = commentData?.comments || [];

  // Helper render content
  const renderContent = () => {
    if (isLoading)
      return <p className="text-center p-4">Loading comments...</p>;
    if (safeCommentList.length === 0) {
      return (
        <div className="flex-center flex-col my-11.5 text-center">
          <span className="text-md-bold">No Comments yet</span>
          <p className="text-sm-regular text-neutral-400">
            Start the conversation
          </p>
        </div>
      );
    }
    return <CommentsListContent commentList={safeCommentList} />;
  };

  return (
    // Struktur Layout Desktop/Mobile disatukan disini atau dipisah sesuai kebutuhan
    // Untuk contoh ini, saya ambil struktur bagian dalam Dialog Desktop Anda
    <div className="flex w-full h-full rounded-lg overflow-hidden flex-col md:flex-row">
      {/* Gambar Kiri (Desktop Only) / Atas (Mobile) */}
      <div className="relative w-full md:w-[560px] h-[200px] md:h-full flex-shrink-0 bg-neutral-900 hidden md:block">
        <Image
          src={feedImageUrl}
          alt="post"
          fill
          unoptimized
          className="object-cover md:rounded-l-lg"
        />
      </div>

      {/* Konten Kanan */}
      <div className="flex flex-col flex-grow h-full w-full md:w-[440px] p-5">
        {/* Header Caption */}
        <div className="flex-shrink-0">
          <div className="flex gap-3 items-center mb-2">
            <Image
              src={authorAvatarUrl}
              alt={authorName}
              width={40}
              height={40}
              className="rounded-full object-cover flex-shrink-0"
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
          <p className="text-sm-regular text-neutral-25 line-clamp-2">
            {captionText}
          </p>
        </div>

        <hr className="my-4 border-neutral-900" />
        <span className="text-md-bold mb-4 block">
          Comments ({commentsCount})
        </span>

        {/* List Komentar */}
        <div className="flex-grow overflow-y-auto thin-scrollbar">
          {renderContent()}
        </div>

        {/* Input */}
        <div className="flex gap-2 w-full mt-4">
          <div className="p-3 border border-neutral-900 w-fit rounded-xl text-white cursor-pointer">
            <Icon
              icon="icon-park-outline:emotion-happy"
              width="20"
              height="20"
            />
          </div>
          <CommentInput postId={id} />
        </div>
      </div>
    </div>
  );
};

export default CommentListContainer;
