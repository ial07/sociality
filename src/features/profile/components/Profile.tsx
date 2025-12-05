"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListProfilePost from "@/features/profile/components/ListProfilePost";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import {
  useProfileMe,
  useProfileMePost,
} from "@/features/profile/hooks/useProfile";
import { useSavedMePost } from "@/features/saves/hooks/useSaves";
import {
  useUserByUsername,
  useUsersPostByUsername,
  useUsersLikesByUsername,
} from "@/features/users/hooks/useUsers";
import { Counts } from "@/types/Profile.type";
import { Icon } from "@iconify/react";
import React, { useMemo } from "react";

interface ProfileProps {
  username?: string;
}

const Profile: React.FC<ProfileProps> = ({ username }) => {
  const isOwnProfile = !username;

  const {
    data: dataMe,
    isLoading: loadMe,
    isError: errMe,
    error: eMe,
  } = useProfileMe();

  const {
    data: dataUser,
    isLoading: loadUser,
    isError: errUser,
    error: eUser,
  } = useUserByUsername(username!);

  const {
    data: galleryMe,
    isLoading: loadGalMe,
    isError: errGalMe,
    error: eGalMe,
  } = useProfileMePost();

  const {
    data: galleryUser,
    isLoading: loadGalUser,
    isError: errGalUser,
    error: eGalUser,
  } = useUsersPostByUsername(username!);

  const {
    data: savedMe,
    isLoading: loadSaved,
    isError: errSaved,
    error: eSaved,
  } = useSavedMePost();

  const {
    data: likesUser,
    isLoading: loadLikes,
    isError: errLikes,
    error: eLikes,
  } = useUsersLikesByUsername(username!);

  const profileData = useMemo(() => {
    if (isOwnProfile) {
      return dataMe;
    }

    if (dataUser) {
      const userCounts = (dataUser.counts as unknown as Counts) || {};

      return {
        profile: dataUser,

        stats: {
          posts: userCounts.post || 0,

          followers: userCounts.followers || 0,
          following: userCounts.following || 0,
          likes: userCounts.likes || 0,
        },
      };
    }

    return undefined;
  }, [isOwnProfile, dataMe, dataUser]);

  const isProfileLoading = isOwnProfile ? loadMe : loadUser;
  const isProfileError = isOwnProfile ? errMe : errUser;
  const profileErrorMsg = isOwnProfile ? eMe?.message : eUser?.message;

  // Gallery Data
  const galleryData = isOwnProfile ? galleryMe : galleryUser;
  const isGalleryLoading = isOwnProfile ? loadGalMe : loadGalUser;
  const isGalleryError = isOwnProfile ? errGalMe : errGalUser;
  const galleryErrorMsg = isOwnProfile ? eGalMe?.message : eGalUser?.message;

  return (
    <div className="h-screen w-full">
      <ProfileInfo
        data={profileData ?? null}
        isLoading={isProfileLoading}
        isError={isProfileError}
        isOwnProfile={isOwnProfile}
        errorMessage={profileErrorMsg || ""}
      />

      <Tabs defaultValue="gallery" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="gallery">
            <Icon icon="uis:web-grid" width="30" height="30" />
            Gallery
          </TabsTrigger>
          {isOwnProfile ? (
            <TabsTrigger value="saved">
              <Icon
                icon="material-symbols:bookmark-outline-rounded"
                width="30"
                height="30"
              />
              Saved
            </TabsTrigger>
          ) : (
            <TabsTrigger value="likes">
              <Icon icon="solar:heart-linear" width="30" height="30" />
              Likes
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="gallery">
          <ListProfilePost
            isOwnProfile={isOwnProfile}
            data={galleryData ?? null}
            isLoading={isGalleryLoading}
            isError={isGalleryError}
            errorMessage={galleryErrorMsg}
          />
        </TabsContent>

        {isOwnProfile && (
          <TabsContent value="saved">
            <ListProfilePost
              isOwnProfile={isOwnProfile}
              data={savedMe ?? null}
              isLoading={loadSaved}
              isError={errSaved}
              errorMessage={eSaved?.message}
            />
          </TabsContent>
        )}

        {!isOwnProfile && (
          <TabsContent value="likes">
            <ListProfilePost
              isOwnProfile={isOwnProfile}
              data={likesUser ?? null}
              isLoading={loadLikes}
              isError={errLikes}
              errorMessage={eLikes?.message}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Profile;
