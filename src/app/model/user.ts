import { Account } from "./account";

export class User {
    constructor(
        public id?:number,
        public account?:Account,
        public username?:String,
        public password?:String,
        public role?:number,
        public language?:String,
        public timezone?:String,
        public browser?:String,
        public ip_address?:String,
        public photo?:String,
        public last_auth?:Date,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public auto_sync?:String,
        public key_value?:String

    ){}

}
