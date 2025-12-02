"use client";

import RouteGuard from "@/components/common/RouteGuard";
import AuthForm from "@/features/auth/components/AuthForm";
import Image from "next/image";
import React from "react";

const AuthPage: React.FC = () => {
  return (
    <RouteGuard isPrivate={false}>
      <div className="flex-center min-h-screen p-4">
        <Image src="/images/bg-auth.png" fill alt="bg" className="-z-10" />
        <div className="w-full">
          <AuthForm />
        </div>
      </div>
    </RouteGuard>
  );
};

export default AuthPage;
