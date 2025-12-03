import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { FeedsListResponse } from "@/types/Feed.type";
import { AxiosError } from "axios";

// Get Feeds
export async function getFeeds(
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<FeedsListResponse>> {
  try {
    const params: Record<string, string | number|undefined> = { page, limit };

    const { data } = await apiInstance.get<ApiResponse<FeedsListResponse>>("/feed", {
      params,
    });

    return data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>
    throw err.response?.data
  }
}