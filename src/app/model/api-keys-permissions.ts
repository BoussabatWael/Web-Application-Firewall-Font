import { ApiKeys } from "./api-keys";

export class ApiKeysPermissions {
 constructor(
        public id?:number,
        public api_key?:ApiKeys,
        public permission?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date
    ){}

}
