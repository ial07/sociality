import { Pagination } from "./Api.type";
import { Author } from "./Profile.type";

export interface Feed {
    id:number;
    imageUrl:string;
    caption:string;
    createdAt:string;
    author:Author;
    likeCount:number;
    commentCount:number;
    likedByMe:boolean
}


export interface FeedsListResponse {
    items: Feed[];
    pagination:Pagination
} 

export interface PostListResponse {
    posts: Feed[];
    pagination:Pagination
} 