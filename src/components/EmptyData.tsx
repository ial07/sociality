import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface EmptyData {
  isOwnProfile: boolean;
}

const EmptyData: React.FC<EmptyData> = ({ isOwnProfile }) => {
  return (
    <>
      {isOwnProfile ? (
        <div className="flex-center flex-col text-center mt-25.5 mb-80">
          <h3 className="text-md-bold md:text-lg-bold mb-1">
            Your story starts here
          </h3>
          <p className="text-sm-regular md:text-md-regular text-neutral-400 mb-6">
            Share your first post and let the world see your moments, passions,
            and memories. Make this space truly yours.
          </p>
          <Button className="rounded-full w-62">
            <Link href="/add-post">Upload My First Post</Link>
          </Button>
        </div>
      ) : (
        <div className="flex-center flex-col text-center mt-25.5 mb-80">
          <p className="text-sm-regular md:text-md-regular text-neutral-400 mb-6">
            No Post
          </p>
        </div>
      )}
    </>
  );
};

export default EmptyData;
