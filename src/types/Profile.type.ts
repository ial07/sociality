export interface Author {
    id:number;
    username:string;
    name:string;
    email: string;
    phone?:string;
    bio?:string;
    avatarUrl?:string;
    createdAt?:string;
}

export interface Stats {
    posts:number;
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
