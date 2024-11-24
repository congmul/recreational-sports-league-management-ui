export type User = {
    _id:string
    email:string
    role:string
    updatedAt:string
    createdAt:string
}
export type Auth = {
    access_token: string,
    userInfo: User
}