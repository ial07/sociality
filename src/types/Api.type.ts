export type ApiResponse<T> = {
    success:boolean;
    message:string;
    data:T
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}