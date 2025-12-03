import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { FeedsListResponse } from "@/types/Feed.type";
import { ProfileResponse } from "@/types/Profile.type";
import { AxiosError } from "axios";

// Get Me
export async function getMe(): Promise<ApiResponse<ProfileResponse>> {
  try {
    const { data } = await apiInstance.get<ApiResponse<ProfileResponse>>("/me");

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}


// Get Me Post
export async function getMePost(
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<FeedsListResponse>> {
    const params: Record<string, string | number|undefined> = { page, limit };
  try {
    const { data } = await apiInstance.get<ApiResponse<FeedsListResponse>>("/me/posts",{
      params
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}