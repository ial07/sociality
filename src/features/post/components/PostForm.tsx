import { Input } from "@/components/ui/input";
import React from "react";

const PostForm: React.FC = () => {
  return (
    <div>
      <Input label="Photo" type="file" />
    </div>
  );
};

export default PostForm;
