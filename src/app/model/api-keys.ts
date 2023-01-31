import { Account } from "./account";

export class ApiKeys {
    constructor(
        public id?:number,
        public account?:Account,
        public key_value?:String | any,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date
    ){}

}
