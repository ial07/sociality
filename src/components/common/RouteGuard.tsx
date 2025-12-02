"use client";

import { useRouter } from "next/navigation";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import React, { useEffect } from "react";

type RouteGuardProps = {
  isPrivate: boolean;
  children: React.ReactNode;
};

export default function RouteGuard({ isPrivate, children }: RouteGuardProps) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuthStatus();

  useEffect(() => {
    if (isLoading) return;

    if (isPrivate) {
      if (!isLoggedIn) {
        router.replace("/auth?type=" + window.location.pathname);
      }
    } else {
      if (isLoggedIn) {
        router.replace("/");
      }
    }
  }, [isLoading, isLoggedIn, isPrivate, router]);

  if (isLoading || (isPrivate && !isLoggedIn) || (!isPrivate && isLoggedIn)) {
    return (
      <div className="flex justify-center items-center h-screen">
        Mengalihkan Akses...
      </div>
    );
  }

  return <>{children}</>;
}
