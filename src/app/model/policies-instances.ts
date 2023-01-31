import { Policy } from "./policy";
import { Server } from "./server";

export class PoliciesInstances {
    constructor(
        public id?:number,
        public status?:number,
        public start_date?:Date,
        public end_date?:Date,
        public policies?:Policy,
        public servers?:Server
    ){}
}
