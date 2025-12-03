import { Pagination } from "./Api.type";

export interface Like {
    id:number;
    username:string;
    name:string;
    avatarUrl?:string;
    isFollowedByMe:boolean;
    isMe:boolean;
    followsMe:boolean;
}

export interface LikesListResponse {
    users: Like[];
    pagination:Pagination
}