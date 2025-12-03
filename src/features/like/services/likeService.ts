import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { LikesListResponse } from "@/types/Like.type";
import { AxiosError } from "axios";

export async function getPostLikesById(
    id: number = 1,
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<LikesListResponse>> {
  try {
 const params: Record<string, string | number|undefined> = { page, limit };
    const { data } = await apiInstance.get<ApiResponse<LikesListResponse>>(`/posts/${id}/likes`,{
      params
    });

    return data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>
    throw err.response?.data
  }
}