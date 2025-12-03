import React from "react";
import Header from "./Header";
import NavigationBar from "./NavigationBar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />

      <main className="custom-container pt-4 md:pt-10 md:w-150">
        {children}
      </main>

      <div className="fixed bottom-0 left-1/2 -translate-1/2">
        <NavigationBar />
      </div>
    </div>
  );
}
