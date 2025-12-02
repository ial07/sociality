// src/app/providers/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { AppDispatch, store } from "@/redux/store";
import { setCredentials } from "@/redux/slices/authSlice";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const dispatch = store.dispatch as AppDispatch;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      const user = null;

      if (token) {
        dispatch(
          setCredentials({
            token,
            user: user || {
              id: "placeholder-id",
              email: "guest@placeholder.com",
              name: "Guest User",
              username: "Guest",
            },
          })
        );
      }
    }
  }, [dispatch]);

  return <Provider store={store}>{children}</Provider>;
}
