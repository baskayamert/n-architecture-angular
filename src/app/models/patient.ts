import { Hospital } from "./hospital";

export interface Patient{
    id:number;
    name:string;
    birthdate:Date;
    hospitalId:number;
    nationalityNumber:string;
    latestHospitalNo:number;
    latestVisitedDepartment:string;
    hospital:Hospital;
}