import { Pagination } from "./Api.type";
import { Author } from "./Profile.type";

export interface Comment {
    id:number;
    text:string;
    createdAt:string;
    author:Author;
    isMine?:boolean
}

export interface CommentsListResponse {
    comments: Comment[];
    pagination:Pagination
}


export interface CommentPayload {
    id:number;
    text:string;
}