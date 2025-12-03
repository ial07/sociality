import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { CommentPayload, CommentsListResponse } from "@/types/Comment.type";
import { AxiosError } from "axios";

export async function getPostCommentsById(
    id: number = 1,
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<CommentsListResponse>> {
  try {
 const params: Record<string, string | number|undefined> = { page, limit };
    const { data } = await apiInstance.get<ApiResponse<CommentsListResponse>>(`/posts/${id}/comments`,{
      params
    });

    return data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>
    throw err.response?.data
  }
}


// POST Comment
export async function postComment(
   { id, text} : CommentPayload
): Promise<ApiResponse<Comment>> {
  try {
    const res = await apiInstance.post<ApiResponse<Comment>>(
      `posts/${id}/comments`,{
        text
      }
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}
