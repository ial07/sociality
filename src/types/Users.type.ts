import { Pagination } from "./Api.type";
import { Author } from "./Profile.type";


export interface UserListResponse{
    users:Author[];
    pagination:Pagination
}
