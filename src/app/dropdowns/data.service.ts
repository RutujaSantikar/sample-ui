import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

   public getDistrict():Observable<any>{

    const url ="http://114.143.217.43:8080/getDistrictsV1";
    return this.http.get(url);
  }

  public getDivision(disData:any):Observable<any>{

    const url ="http://114.143.217.43:8080/";
    return this.http.get(url + 'getDivisionsV1?disId=' + disData);
  }


  public getSubDivision(disData:any,divisionData:any):Observable<any>{
    const url ="http://114.143.217.43:8080/";
    return this.http.get(url + "getSubDivisionsV1?disId=" + disData + "&divId=" + divisionData);

  }

  public getSummaryReport(disData:any,divisionData:any,subdivisionData:any, fromDate1:any, toDate1:any):Observable<any>{
    const url ="http://114.143.217.43:8080/";
    return this.http.get(url + "getSummaryReport?disId=" + disData + "&divId=" + divisionData + "&sudId=" + subdivisionData + "&frmDate=" + fromDate1 + "&toDate=" + toDate1);

  }

}
