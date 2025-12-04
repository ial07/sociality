"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CommentListContainer from "./CommentListContainer"; // Import anak baru

interface CommentCountModalProps {
  id: number;
  commentsCount: number;
  trigger: React.ReactNode;
  authorName: string;
  authorAvatarUrl: string;
  timeAgo: string;
  feedImageUrl: string;
  captionText: string;
}

const CommentCountModal: React.FC<CommentCountModalProps> = (props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{props.trigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl p-0">
          <SheetHeader className="px-4 pt-4 border-b border-neutral-800">
            <SheetTitle>Comments ({props.commentsCount})</SheetTitle>
          </SheetHeader>

          {isOpen && (
            <div className="h-full">
              <CommentListContainer {...props} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{props.trigger}</DialogTrigger>
      <DialogContent className="p-0 max-w-[1000px] flex h-[600px] gap-0">
        <DialogTitle className="hidden">Comments</DialogTitle>

        {isOpen && <CommentListContainer {...props} />}
      </DialogContent>
    </Dialog>
  );
};

export default CommentCountModal;
