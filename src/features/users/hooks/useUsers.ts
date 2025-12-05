import {
  getUserByUsername,
  getUsersLikesByUsername,
  getUsersPostByUsername,
  getUsersSearch,
} from "../services/usersService";
import { ApiResponse } from "@/types/Api.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserListResponse } from "@/types/Users.type";
import { Author } from "@/types/Profile.type";
import { PostListResponse } from "@/types/Feed.type";

export function useUsersSearch(
  q: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery<UserListResponse, Error>({
    queryKey: ["userSearch", q, page, limit],
    queryFn: async () => {
      const res: ApiResponse<UserListResponse> = await getUsersSearch(
        q,
        page,
        limit
      );

      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!q, 
  });
}

export function useUserByUsername(username: string) {
  return useQuery<Author, Error>({
    queryKey: ["user", username],
    queryFn: async () => {
      const res: ApiResponse<Author> = await getUserByUsername(username);
      return res.data;
    },
    enabled: !!username, 
  });
}

export function useUsersPostByUsername(
  username: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery<PostListResponse, Error>({
    queryKey: ["userPosts", username, page, limit],
    queryFn: async () => {
      const res: ApiResponse<PostListResponse> = await getUsersPostByUsername(
        username,
        page,
        limit
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!username,
  });
}

export function useUsersLikesByUsername(
  username: string,
  page: number = 1,
  limit: number = 10
) {
  return useQuery<PostListResponse, Error>({
    queryKey: ["userLikes", username, page, limit],
    queryFn: async () => {
      const res: ApiResponse<PostListResponse> = await getUsersLikesByUsername(
        username,
        page,
        limit
      );
      return res.data;
    },
    placeholderData: keepPreviousData, 
    enabled: !!username,
  });
}