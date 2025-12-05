import RouteGuard from "@/components/common/RouteGuard";
import MainLayout from "@/components/layout/MainLayout";
import React from "react";

export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard isPrivate={true}>
      <MainLayout>{children}</MainLayout>
    </RouteGuard>
  );
}
