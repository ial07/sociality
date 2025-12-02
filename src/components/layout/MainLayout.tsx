import React from "react";
import Header from "./Header";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />

      <main className="custom-container pt-4 md:pt-12">{children}</main>

      {/* <Footer /> */}
    </div>
  );
}
