"use client";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "@/providers/ReduxProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <QueryProvider>
            {children}

            <ToastContainer />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
