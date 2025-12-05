// src/app/providers/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode, useEffect } from "react";
import { AppDispatch, store } from "@/redux/store";
import { setCredentials } from "@/redux/slices/authSlice";
import { Author } from "@/types/Profile.type";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const dispatch = store.dispatch as AppDispatch;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      const getInitialUser = (): Author | null => {
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");
          if (userData) {
            try {
              return JSON.parse(userData);
            } catch (error) {
              console.error(
                "Error parsing user data from local storage",
                error
              );
              return null;
            }
          }
        }
        return null;
      };
      const user = localStorage.getItem("user");

      if (token) {
        dispatch(
          setCredentials({
            token,
            user: getInitialUser() || {
              id: 0,
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
