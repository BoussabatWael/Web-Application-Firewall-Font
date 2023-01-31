import { Account } from "./account";
import { Category } from "./category";
import { GroupRule } from "./group-rule";
import { RulesInstances } from "./rules-instances";
import { Server } from "./server";

export class Rule {
    constructor(
        public id?:number|any,
        public servers?:Server,
        public account?:Account,
        public categories?:Category,
        public name?:String,
        public action?:String,
        public protocol?:String,
        public port?:String,
        public ip_address?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public groupRule?:Array<GroupRule>,
        public rulesInstaces?:Array<RulesInstances>


    ){}
}
