"use client";

import Image from "next/image";
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { LikesListResponse } from "@/types/Like.type";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";

// --- Definisi Props ---
interface LikeCountModalProps {
  likesCount: number;
  trigger: ReactNode;
  likeList: LikesListResponse;
}

const LikesListContent: React.FC<Pick<LikeCountModalProps, "likeList">> = ({
  likeList,
}) => (
  <div className="max-h-[400px] overflow-y-auto px-4">
    {likeList.users.map((item) => (
      <div key={item.id} className="flex-between gap-5">
        <div className="flex gap-3 items-center">
          <Image
            src={item.avatarUrl ?? "/images/author.png"}
            alt={item.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
            unoptimized
          />
          <div>
            <h3 className="text-sm-bold md:text-md-bold text-foreground">
              {item.name}
            </h3>
            <p className="text-xs-regular md:text-sm-regular text-neutral-400">
              {item.username}
            </p>
          </div>
        </div>
        <Button variant="default" className="rounded-full px-6">
          Follow
        </Button>
      </div>
    ))}
  </div>
);

const LikeCountModal: React.FC<LikeCountModalProps> = ({
  likesCount,
  trigger,
  likeList,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (likesCount === 0) {
    return <>{trigger}</>;
  }

  // --- Mobile (Sheet) ---
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-2xl">
          <SheetHeader>
            <SheetTitle>Likes</SheetTitle>
          </SheetHeader>
          <SheetDescription asChild>
            <LikesListContent likeList={likeList} />
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  // --- Desktop (Dialog) ---
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Likes</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <LikesListContent likeList={likeList} />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default LikeCountModal;
