import { Rule } from "./rule";
import { Server } from "./server";

export class RulesInstances {
    constructor(
        public id?:number,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public rules?:Rule,
        public servers?:Server
    ){}
}
