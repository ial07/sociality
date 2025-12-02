export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    phoneNumber?:string;
    role?:"USER"|"ADMIN"
    createdAt?:string;
  }


export type ProfileResponse = {
    profile : User;
    reviewsCount:number;
}