import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  accessToken = localStorage.getItem('accessToken'); 
  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.accessToken}`
  });
  
  
login(data:any){
  return this.http.post<any>("https://localhost:7198/api/Authentication/login",data);
}

resetPin(data:any){
  const accessToken = localStorage.getItem('accessToken'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${accessToken}`
  });
  return this.http.post<any>("https://localhost:7198/api/Authentication/reset_pin_after_login",data,{ headers:headers });
}


}
