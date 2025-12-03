"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ListProfilePost from "@/features/profile/components/ListProfilePost";
import ProfileInfo from "@/features/profile/components/ProfileInfo";
import {
  useProfileMe,
  useProfileMePost,
} from "@/features/profile/hooks/useProfile";
import { useSavedMePost } from "@/features/saves/hooks/useSaves";
import { Icon } from "@iconify/react";
import React from "react";

const Profile: React.FC = () => {
  const { data, isLoading, isError, error } = useProfileMe();

  const {
    data: dataGallery,
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    error: errorGallery,
  } = useProfileMePost();

  const {
    data: dataSaved,
    isLoading: isLoadingSaved,
    isError: isErrorSaved,
    error: errorSaved,
  } = useSavedMePost();
  return (
    <div>
      <ProfileInfo
        data={data ?? null}
        isError={isError}
        isLoading={isLoading}
        errorMessage={error?.message}
      />
      <Tabs defaultValue="gallery" className="w-full mt-4">
        <TabsList>
          <TabsTrigger value="gallery">
            <Icon icon="uis:web-grid" width="30" height="30" />
            Gallery
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Icon
              icon="material-symbols:bookmark-outline-rounded"
              width="30"
              height="30"
            />
            Saved
          </TabsTrigger>
        </TabsList>
        <TabsContent value="gallery">
          <ListProfilePost
            data={dataGallery ?? null}
            isLoading={isLoadingGallery}
            isError={isErrorGallery}
            errorMessage={errorGallery?.message}
          />
        </TabsContent>
        <TabsContent value="saved">
          <ListProfilePost
            data={dataSaved ?? null}
            isLoading={isLoadingSaved}
            isError={isErrorSaved}
            errorMessage={errorSaved?.message}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
