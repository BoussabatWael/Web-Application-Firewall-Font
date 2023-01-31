import { Account } from "./account";
import { Category } from "./category";
import { GroupRule } from "./group-rule";
import { Rule } from "./rule";

export class Group {
    constructor(
        public id?:number,
        public account?:Account,
        public rules?:Rule,
        public categories?:Category,
        public name?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public groupRule?:Array<GroupRule>,
    ){}
}
