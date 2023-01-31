import { Account } from "./account";
import { Category } from "./category";
import { PoliciesInstances } from "./policies-instances";
import { Provider } from "./provider";

export class Policy {
    constructor(
        public id?:number,
        public account?:Account,
        public categories?:Category,
        public providers?:Provider,
        public name?:String,
        public metric?:number,
        public action?:String,
        public duration?:number,
        public threshold?:String,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public policyInstance?:Array<PoliciesInstances>
    ){}
}
