import { Group } from "./group";
import { Rule } from "./rule";

export class GroupRule {
    constructor(
        public id?:number,
        public groups?:Group,
        public rules?:Rule,
        public status?:number,
        public start_date?:Date
        //public groupsRules?:Array<groupsrul>


    ){}
}
