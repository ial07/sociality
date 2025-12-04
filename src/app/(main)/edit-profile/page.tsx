import EditProfileForm from "@/features/profile/components/EditProfileForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const EditProfile: React.FC = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex-start gap-3 hidden md:inline cursor-pointer mb-6"
      >
        <ArrowLeft width={32} height={32} />
        <h1 className="display-xs-bold">Edit Profile</h1>
      </Link>

      <EditProfileForm />
    </div>
  );
};

export default EditProfile;
