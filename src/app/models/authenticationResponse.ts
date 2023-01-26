import { ResponseModel } from "./responseModel";

export interface AuthenticationResponse extends ResponseModel{
    accessToken:string;
    refreshToken:string;
}