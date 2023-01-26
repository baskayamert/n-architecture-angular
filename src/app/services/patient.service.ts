import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PatientDeletionDto } from '../models/DTOs/PatientDtos/patientDeletionDto';
import { PatientRegisterDto } from '../models/DTOs/PatientDtos/patientRegisterDto';
import { ListResponseModel } from '../models/listResponseModel';
import { Patient } from '../models/patient';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl = "https://localhost:7126/api/";

  constructor(private httpClient:HttpClient) { }

  getPatients():Observable<ListResponseModel<Patient>>{
    let newPath = this.apiUrl + "patients/getall";
    return this.httpClient.get<ListResponseModel<Patient>>(newPath);
  }
  
  getPatientsByHospitalId(hospitalId:number):Observable<ListResponseModel<Patient>>{
    let newPath = this.apiUrl + "patients/patientsbyhospitalid?hospitalId="+hospitalId;
    return this.httpClient.get<ListResponseModel<Patient>>(newPath);
  }
  
  deletePatient(patient:PatientDeletionDto):Observable<ResponseModel>{
    let newPath = this.apiUrl + "patients/delete";
    return this.httpClient.post<ResponseModel>(newPath, patient);
  }
  
  addPatient(patient:PatientRegisterDto):Observable<ResponseModel>{
    let newPath = this.apiUrl + "patients/add";
    return this.httpClient.post<ResponseModel>(newPath, patient);
  }

}
