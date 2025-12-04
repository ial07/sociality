"use client";

import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useEditProfile, useProfileMe } from "../hooks/useProfile";
import {
  EditProfileFormValues,
  editProfileSchema,
} from "../schema/profileSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

const EditProfileForm: React.FC = () => {
  const { data: userData, isLoading: isUserLoading } = useProfileMe();
  const { editProfileMutation, isLoading } = useEditProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.profile.name,
        username: userData.profile.username,
        email: userData.profile.email,
        phone: userData.profile.phone || "",
        bio: userData.profile.bio || "",
      });
    }
  }, [userData, reset]);

  const onSubmit = (values: EditProfileFormValues) => {
    editProfileMutation.mutate(values);
  };

  const { value: avatarValue, ...avatarProps } = register("avatar");

  if (isUserLoading) return <div>Loading...</div>;

  return (
    <form
      className="flex md:justify-between items-center md:items-start flex-col md:flex-row gap-12 mt-8 mb-30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-center flex-col w-40">
        <img
          src="/images/author.png"
          alt="author"
          className="size-20 md:size-30 aspect-square"
        />
      </div>
      <div className="w-full">
        <Input
          label="Name"
          id="name"
          {...register("name")}
          error={errors.name?.message}
          className="mb-4"
          readOnly
        />

        <Input
          label="Username"
          id="username"
          {...register("username")}
          error={errors.username?.message}
          className="mb-4"
          readOnly
        />

        <Input
          label="Email"
          id="email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
          className="mb-4"
          readOnly
        />

        <Input
          label="Phone Number"
          id="phone"
          {...register("phone")}
          error={errors.phone?.message}
          className="mb-4"
        />

        {/* Bio biasanya Textarea, tapi pakai Input dulu sesuai request */}
        <Input
          label="Bio"
          id="bio"
          {...register("bio")}
          error={errors.bio?.message}
          className="mb-4"
        />

        <Button
          type="submit"
          className="w-full bg-primary-300 hover:bg-primary-300/90 text-white rounded-full mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
