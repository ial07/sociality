import { apiInstance } from '@/api/api'
import { ApiResponse } from '@/types/Api.type'
import { AuthState, LoginPayload, registerPayload } from '@/types/Auth.type'
import { Author } from '@/types/Profile.type'
import type { AxiosError } from 'axios'

// POST Login
export async function login(
  payload: LoginPayload
): Promise<ApiResponse<AuthState>> {
  try {
    const res = await apiInstance.post<ApiResponse<AuthState>>(
      '/auth/login',
      payload
    )
    return res.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>
    throw err.response?.data
  }
}

// POST Register
export async function register(
  payload: registerPayload
): Promise<ApiResponse<Author>> {
  try {
    const res = await apiInstance.post<ApiResponse<Author>>(
      '/auth/register',
      payload
    )
    return res.data
  } catch (error) {
    const err = error as AxiosError<ApiResponse<null>>
    throw err.response?.data
  }
}
