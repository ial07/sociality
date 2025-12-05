import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { FollowPayload } from "@/types/Follow.ts";
import { Author } from "@/types/Profile.type";
import { AxiosError } from "axios";

// POST Follow
export async function follow(
  payload: FollowPayload
): Promise<ApiResponse<Author>> {
  try {
    const res = await apiInstance.post<ApiResponse<Author>>(
      `follow/${payload.username}`
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}

// DELETE Follow
export async function unfollow(
  payload: FollowPayload
): Promise<ApiResponse<Author>> {
  try {
    const res = await apiInstance.delete<ApiResponse<Author>>(
      `follow/${payload.username}`
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}
