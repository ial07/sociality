'use client';

import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation"; 
import { ApiResponse } from "@/types/Api.type";
import { AuthState, LoginPayload, registerPayload } from "@/types/Auth.type";
import { login, register } from "../services/authService";
import { setCredentials } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { Author } from "@/types/Profile.type";

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter(); 

  const loginMutation = useMutation<ApiResponse<AuthState>, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (data) => {
      dispatch(setCredentials({ token: data.data.token!, user: data.data.user! }));
      router.push("/"); // <-- Ganti navigate("/home")
    },
  });

  const registerMutation = useMutation<ApiResponse<Author>, Error, registerPayload>({
    mutationFn: register,
    onSuccess: (data) => { 
      const successMessage = data.message || "Registration successful!"; 
      toast.success(successMessage)
      window.location.href = "/auth?type=login";
    },
  });

  const isLoading = loginMutation.isPending || registerMutation.isPending;
  const isError = loginMutation.isError || registerMutation.isError;
  const errorMessage =
    loginMutation.error?.message || registerMutation.error?.message || "";

  return { loginMutation, registerMutation, isLoading, isError, errorMessage };
};