import { PostCreationPayload } from "@/types/Post.type";

import { AxiosError } from "axios";
import { Feed } from "@/types/Feed.type";
import { ApiResponse } from "@/types/Api.type";
import { apiInstance } from "@/api/api";

export async function createPost(
  payload: PostCreationPayload
): Promise<ApiResponse<Feed>> {
  const formData = new FormData();

  const fileToAppend = payload.image[0];

  formData.append("image", fileToAppend);

  if (payload.caption) {
    formData.append("caption", payload.caption);
  }

  try {
    const res = await apiInstance.post<ApiResponse<Feed>>("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}
