"use client";

import { Button } from "@/components/ui/button";
import FollowButton from "@/features/follow/components/FollowButton";
import { ProfileResponse, ProfileUserResponse } from "@/types/Profile.type";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileInfoProps {
  data: ProfileResponse | ProfileUserResponse | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | undefined;
  isOwnProfile: boolean;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  data,
  isLoading,
  isError,
  errorMessage,
  isOwnProfile,
}) => {
  if (isError) return <span>{errorMessage}</span>;

  if (isLoading || !data) return <span>Loading profile info...</span>;

  return (
    <div>
      <div className="flex-between mb-4">
        <div className="flex gap-3 items-center mb-2">
          <Image
            src={data.profile.avatarUrl ?? "/images/author.png"}
            alt={data.profile.name}
            width={40}
            height={40}
            className="rounded-full object-cover flex-shrink-0"
            unoptimized
          />
          <div>
            <h3 className="text-sm-bold md:text-md-bold text-foreground">
              {data.profile.name}
            </h3>
            <p className="text-xs-regular md:text-sm-regular text-neutral-400">
              {data.profile.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isOwnProfile ? (
            <Button variant={"outline"} className="rounded-full" asChild>
              <Link href="/edit-profile">Edit Profile</Link>
            </Button>
          ) : (
            <FollowButton
              targetUsername={data.profile.username}
              isFollowing={data.profile.isFollowing ?? false}
            />
          )}

          <div className="rounded-full border border-neutral-900 p-3 cursor-pointer hover:bg-neutral-900 transition-colors">
            <Icon icon="bitcoin-icons:share-outline" width="24" height="24" />
          </div>
        </div>
        {/* ------------------------------- */}
      </div>
      <p className="text-sm-regular md:text-md-regular mb-4">
        {data.profile.bio}
      </p>

      <div className="flex w-full divide-x divide-neutral-900 border-neutral-900">
        <div className="flex flex-col items-center justify-center py-3 flex-1">
          <span className="text-lg-bold md:text-xl-bold">
            {data.stats.posts}
          </span>
          <span className="text-xs-regular md:text-md-regular text-neutral-400">
            Post
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-3 flex-1">
          <span className="text-lg-bold md:text-xl-bold">
            {data.stats.followers}
          </span>
          <span className="text-xs-regular md:text-md-regular text-neutral-400">
            Followers
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-3 flex-1">
          <span className="text-lg-bold md:text-xl-bold">
            {data.stats.following}
          </span>
          <span className="text-xs-regular md:text-md-regular text-neutral-400">
            Following
          </span>
        </div>
        <div className="flex flex-col items-center justify-center py-3 flex-1">
          <span className="text-lg-bold md:text-xl-bold">
            {data.stats.likes}
          </span>
          <span className="text-xs-regular md:text-md-regular text-neutral-400">
            Likes
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
