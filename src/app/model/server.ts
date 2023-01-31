import { Account } from "./account";
import { Category } from "./category";
import { Provider } from "./provider";
import { Rule } from "./rule";
import { RulesInstances } from "./rules-instances";

export class Server {
    constructor(
        public id?:number,
        public account?:Account,
        public categories?:Category,
        public providers?:Provider,
        public name?:String,
        public ip_address?:String,
        public authorization?: number,
        public operating_system?:String,
        public system_version?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public rulesInstances?:Array<RulesInstances>
    ){}
}
