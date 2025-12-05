import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { PostListResponse } from "@/types/Feed.type";
import { Author } from "@/types/Profile.type";
import { UserListResponse } from "@/types/Users.type";
import { AxiosError } from "axios";

export async function getUsersSearch(
  q: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<UserListResponse>> {
  try {
    const params: Record<string, string | number | undefined> = { page, limit };
    if (q) params.q = q;
    const { data } = await apiInstance.get<ApiResponse<UserListResponse>>(
      `users/search`,{
        params
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}

export async function getUserByUsername(
  username: string,
): Promise<ApiResponse<Author>> {
  try {
    const { data } = await apiInstance.get<ApiResponse<Author>>(
      `users/${username}`);

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}


export async function getUsersPostByUsername(
  username: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PostListResponse>> {
  try {
    const params: Record<string, string | number | undefined> = { page, limit };
    const { data } = await apiInstance.get<ApiResponse<PostListResponse>>(
      `users/${username}/posts`,{
        params
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}

export async function getUsersLikesByUsername(
  username: string,
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse<PostListResponse>> {
  try {
    const params: Record<string, string | number | undefined> = { page, limit };
    const { data } = await apiInstance.get<ApiResponse<PostListResponse>>(
      `users/${username}/likes`,{
        params
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}