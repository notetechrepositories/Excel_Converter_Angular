import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataUpdateModel } from '../model/DataUpdateModel';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
 

  constructor(private http:HttpClient) { }

 url="http://59.94.176.2:3241/api/"; 

 accessToken = localStorage.getItem('accessToken'); 
 headers = new HttpHeaders({
   'Authorization': `Bearer ${this.accessToken}`
 });

  getDataConfiguration(excelFile:any): Observable<string>{
    return this.http.post<any>("https://localhost:7198/api/Extract_Database_Configuration_From_SpreadSheet",excelFile,{headers:this.headers});
  }

  verifyConfiguration(excelData: any) {
    return this.http.post<any>("https://localhost:7198/api/Verify_Database_Configuration",excelData,{headers:this.headers});
  }

  retrieveSchema(data:any){
    return this.http.post<any>("https://localhost:7198/api/retrieve_schema",data,{headers:this.headers});
  }
  
  convertExcel(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>("https://localhost:7198/api/Create_Schemas_From_SpreadSheet",formData,{headers:this.headers});
  }

  addTable(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>("https://localhost:7198/api/Add_Tables_To_Existed_Schemas_From_SpreadSheet",formData,{headers:this.headers});
  }

  addField(file:any, configList:any){
    const formData = new FormData();
    formData.append('excelFile',file);
    formData.append('databaseConfigList',JSON.stringify(configList))
    console.log(formData);
    return this.http.post<any>("https://localhost:7198/api/Add_Fields_To_Existed_Schemas_From_SpreadSheet",formData,{headers:this.headers});
  }

  generateExcelforCreation(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.get('https://localhost:7198/api/Generate_SpreadSheet_For_Creation', {
      headers: headers,
      responseType: 'blob'
    });
  }


  generateSpreadsheetForRetrieveData(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post("https://localhost:7198/api/Generate_SpreadSheet_For_Retrieve_TableFields_Details", data,
    {headers: headers,
    responseType: 'blob'});
  }


  generateSpreadsheetForRetrieveAllDetails(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post("https://localhost:7198/api/Generate_SpreadSheet_For_Retrieve_TableFields_With_Data", data,
    {headers: headers,
    responseType: 'blob'});
  }

  generateSpreadsheetForUpdateData(data:any):Observable<Blob>{
    console.log(data);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Authorization': `Bearer ${this.accessToken}`
    });
    return this.http.post("https://localhost:7198/api/Generate_SpreadSheet_For_Updation", data,
    {headers: headers,
    responseType: 'blob'});
  }


  downloadFileForCreate(): Observable<Blob> {
    const fileUrl = 'assets/file/HowItsWorks.pdf';
    return this.http.get(fileUrl, { responseType: 'blob',headers:this.headers});
  }

  downloadFileForDownload(): Observable<Blob> {
    const fileUrl = 'assets/file/Howitsworks2.pdf';
    return this.http.get(fileUrl, { responseType: 'blob',headers:this.headers });
  }

    getAuthorizedUserDetails(){
      return this.http.get<any>(`https://localhost:7198/api/User/details/authorize-user`,{ headers:this.headers })  //All User(company_admin,company_user)
    }


    logout(id:any){
      return this.http.post<any>(`https://localhost:7198/api/Authentication/logout?connectionId=${id}`,{},{headers:this.headers})
    }

 
}
