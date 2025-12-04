import { Author } from "@/types/Profile.type";
import { getUsersSearch } from "../services/usersService";
import { ApiResponse } from "@/types/Api.type";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { UserListResponse } from "@/types/Users.type";

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