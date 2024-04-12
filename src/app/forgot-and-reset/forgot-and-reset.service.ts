import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotAndResetService {

  constructor(private http:HttpClient) { }

  forgotPassword(data:any){
    return this.http.post<any>("https://localhost:7198/api/Authentication/forgot_password",data);
  }

  OtpVerification(data:any){
    return this.http.post<any>("https://localhost:7198/api/Authentication/otp_verification",data);
  }

  resetPassword(data:any){
    return this.http.post<any>("https://localhost:7198/api/Authentication/reset_pin_before_login",data);
  }
}
