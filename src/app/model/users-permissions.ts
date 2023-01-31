import { User } from "./user";

export class UsersPermissions {
    constructor(
        public id?:number,
        public users?:User,
        public code?:String,
        public status?:number

    ){}
}
