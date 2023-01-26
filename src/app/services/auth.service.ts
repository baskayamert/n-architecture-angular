import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { UserLoginDto } from '../models/DTOs/UserDtos/UserLoginDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:7126/api/Auth/";


  constructor(private httpClient:HttpClient) { }

  login(user:UserLoginDto) : Observable<AuthenticationResponse>{
    let newUrl = this.apiUrl + "login";
    return this.httpClient.post<AuthenticationResponse>(newUrl, user);
  }

  refreshToken(refreshToken:string) : Observable<any>{
    let newUrl = this.apiUrl + "refreshtoken?refreshToken=" + refreshToken;
    return this.httpClient.post<any>(newUrl,null);
  }
}
