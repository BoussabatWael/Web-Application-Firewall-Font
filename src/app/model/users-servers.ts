import { Server } from "./server";
import { User } from "./user";

export class UsersServers {
    constructor(
        public id?:number|any,
        public servers?:Server,
        public users?:User,
        public auto_sync?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date


    ){}

}
