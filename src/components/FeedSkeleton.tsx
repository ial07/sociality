// src/components/Feed/FeedSkeleton.tsx
import React from "react";

const FeedSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="flex gap-3 items-center mb-4">
        <div className="w-10 h-10 bg-neutral-800 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-neutral-800 rounded w-24" />
          <div className="h-3 bg-neutral-800 rounded w-16" />
        </div>
      </div>

      <div className="w-full aspect-square bg-neutral-800 rounded-md mb-3" />

      <div className="flex justify-between mb-3">
        <div className="flex gap-4">
          <div className="w-6 h-6 bg-neutral-800 rounded" />
          <div className="w-6 h-6 bg-neutral-800 rounded" />
          <div className="w-6 h-6 bg-neutral-800 rounded" />
        </div>
        <div className="w-6 h-6 bg-neutral-800 rounded" />
      </div>

      {/* Text Lines */}
      <div className="space-y-2">
        <div className="h-4 bg-neutral-800 rounded w-3/4" />
        <div className="h-4 bg-neutral-800 rounded w-1/2" />
      </div>
    </div>
  );
};

export default FeedSkeleton;
