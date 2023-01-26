import { Patient } from "./patient";

export interface Hospital{
    id:number;
    name:string;
    lat:string;
    long:string;
    address:string;
    patients:Patient[];
}