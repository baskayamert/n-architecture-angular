import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hospital } from '../models/hospital';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  apiUrl = "https://localhost:7126/api/Hospitals/getall";

  constructor(private httpClient:HttpClient) { }

  getHospitals():Observable<ListResponseModel<Hospital>>{
    return this.httpClient.get<ListResponseModel<Hospital>>(this.apiUrl);
  }
  
}
