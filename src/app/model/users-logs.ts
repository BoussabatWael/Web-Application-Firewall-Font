import { User } from "./user";

export class UsersLogs {
    constructor(
        public id?:number,
        public users?:User,
        public action?:String,
        public action_date?:Date,
        public element?:number,
        public element_id?:number,
        public source?:number,
        public code?:String

    ){}
}
