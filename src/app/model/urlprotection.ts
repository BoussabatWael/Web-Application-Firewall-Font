import { Server } from "./server";

export class Urlprotection {
    constructor(
        public id?:number,
        public server?:Server,
        public url?:String,
        public ip_address?:String,
        public status?:number
        

    ){}
}
