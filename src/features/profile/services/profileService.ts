import { apiInstance } from "@/api/api";
import { ApiResponse } from "@/types/Api.type";
import { FeedsListResponse } from "@/types/Feed.type";
import { Author, ProfileResponse, UpdateProfilePayload } from "@/types/Profile.type";
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

export async function updateProfile(
  payload: UpdateProfilePayload
): Promise<ApiResponse<Author>> {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("username", payload.username);
  formData.append("email", payload.email);
  
  if (payload.phoneNumber) {
    formData.append("phoneNumber", payload.phoneNumber);
  }
  
  if (payload.bio) {
    formData.append("bio", payload.bio);
  }

  if (payload.avatar && payload.avatar.length > 0) {
    formData.append("avatar", payload.avatar[0]); 
  }

  try {
    const res = await apiInstance.patch<ApiResponse<Author>>(
      "/me",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>;
    throw err.response?.data;
  }
}