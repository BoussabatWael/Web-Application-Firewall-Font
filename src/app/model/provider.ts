import { Account } from './account';
import { Category } from './category';
export class Provider {
    constructor(
        public id?:number,
        public name?:String,
        public website?:String,
        public tag?:String,
        public logo?:String,
        public firewall?:number,
        public status?:number,
        public start_date?:number,
        public categories?:Category,
        public account?:Account
    ){}
}
