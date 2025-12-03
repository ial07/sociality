"use client";

import PostForm from "@/features/post/components/PostForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddPost: React.FC = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex-start gap-3 hidden md:inline cursor-pointer mb-6"
      >
        <ArrowLeft width={32} height={32} />
        <h1 className="display-xs-bold">Add Post</h1>
      </Link>

      <PostForm />
    </div>
  );
};

export default AddPost;
