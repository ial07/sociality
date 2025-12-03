import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { PostListResponse } from "@/types/Feed.type";
import { AxiosError } from "axios";

// Get Saved Me Post
export async function getSavedMePost(
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<PostListResponse>> {
    const params: Record<string, string | number|undefined> = { page, limit };
  try {
    const { data } = await apiInstance.get<ApiResponse<PostListResponse>>("/me/saved",{
      params
    });

    return data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}