import { Rule } from "./rule";
import { UsersServers } from "./users-servers";

export class UsersServersRules {
    constructor(
        public id?:number|any,
        public usersServers?:UsersServers,
        public rules?:Rule,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date


    ){}

}
