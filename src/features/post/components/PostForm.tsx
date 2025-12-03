import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { useCreatePost } from "../hooks/usePost";
import { NewPostFormValues, newPostSchema } from "../schema/postSchema";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const PostForm: React.FC = () => {
  const { postMutation, isLoading, isError, errorMessage } = useCreatePost();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewPostFormValues>({ resolver: zodResolver(newPostSchema) });

  const onSubmit = (values: NewPostFormValues) => {
    const imageFile = values.image?.[0];
    console.log(imageFile);

    if (!imageFile) {
      toast.error("Please select an image file.");
      return;
    }

    const payload = {
      image: values.image,
      caption: values.caption,
    };

    postMutation.mutate(payload, {
      onSuccess: () => {
        reset();
      },
    });
  };

  const { value, ...imageProps } = register("image");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Photo"
        type="file"
        id="image"
        {...imageProps}
        error={errors.image?.message}
      />

      <Input
        label="Caption"
        id="caption"
        type="text"
        {...register("caption")}
        error={errors.caption?.message}
      />

      <Button
        type="submit"
        className="w-full rounded-full mb-4"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Share"}
      </Button>
    </form>
  );
};

export default PostForm;
