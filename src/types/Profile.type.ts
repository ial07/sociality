export interface Author {
    id:number;
    username:string;
    name:string;
    email?: string;
    phone?:string;
    bio?:string;
    avatarUrl?:string;
    createdAt?:string;
    isFollowedByMe?:boolean;
    counts?: Counts;
    isFollowing?:boolean;
    isMe?:boolean;
}

export interface Stats {
    posts:number;
    followers:number;
    following:number;
    likes:number;
  }

  export interface Counts {
    post:number;
    followers:number;
    following:number;
    likes:number;
  }


export type ProfileResponse = {
    profile : Author;
    stats:Stats;
}

export type ProfileUserResponse = {
    profile : Author;
    stats:Stats;
}

export interface UpdateProfilePayload {
  name: string;
  username: string;
  email: string;
  phoneNumber?: string;
  bio?: string;
  avatar?: FileList;
}