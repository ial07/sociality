"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
// Import Dialog components
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CommentsListResponse } from "@/types/Comment.type";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import CommentInput from "./CommentInput";
import { DialogTitle } from "@radix-ui/react-dialog";

interface CommentCountModalProps {
  id: number;
  commentsCount: number;
  trigger: ReactNode;
  commentList: CommentsListResponse;
  authorName: string;
  authorAvatarUrl: string;
  timeAgo: string;
  feedImageUrl: string;
  captionText: string;
}

const CommentsListContent: React.FC<
  Pick<CommentCountModalProps, "commentList">
> = ({ commentList }) => (
  <div className="w-full">
    {commentList.comments.map((item) => (
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

// --- Komponen Utama Modal ---
const CommentCountModal: React.FC<CommentCountModalProps> = ({
  id,
  commentsCount,
  trigger,
  commentList,
  authorName,
  authorAvatarUrl,
  timeAgo,
  feedImageUrl,
  captionText,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // --- Mobile (Sheet) ---
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <SheetHeader className="px-4 pt-4 border-b border-neutral-800">
            <SheetTitle>Comments ({commentsCount})</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto pt-4 grow">
            <CommentsListContent commentList={commentList} />
          </div>
          <div className="flex gap-2 w-full">
            <div className="p-3 border border-neutral-900 w-fit rounded-xl text-white cursor-pointer">
              <Icon
                icon="icon-park-outline:emotion-happy"
                width="20"
                height="20"
              />
            </div>
            <CommentInput postId={id} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 max-w-[1000px] flex h-[600px] gap-0">
        <DialogTitle />
        <DialogDescription asChild>
          <div className="flex w-full h-full rounded-lg overflow-hidden">
            <div className="relative w-[560px] h-full flex-shrink-0 bg-neutral-900">
              <Image
                src={feedImageUrl}
                alt="post"
                fill
                unoptimized
                className="object-cover rounded-l-lg"
              />
            </div>

            <div className="flex flex-col flex-grow h-full w-[440px] p-5">
              <div className="flex-shrink-0">
                <div className="flex gap-3 items-center mb-2">
                  <Image
                    src={authorAvatarUrl ?? "/images/author.png"}
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
              <div className="flex-grow overflow-y-auto thin-scrollbar">
                {commentList.comments.length == 0 ? (
                  <div className="flex-center flex-col my-11.5">
                    <span className="text-md-bold">No Comments yet</span>
                    <p className="text-sm-regular text-neutral-400">
                      Start the conversation
                    </p>
                  </div>
                ) : (
                  <CommentsListContent commentList={commentList} />
                )}
              </div>

              <div className="flex gap-2 w-full">
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
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CommentCountModal;
