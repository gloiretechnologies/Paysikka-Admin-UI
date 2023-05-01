import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  serverEndpoint = `${environment.BaseUrl}`;
  constructor(private http:HttpClient) {
    if (environment.production) {
      this.serverEndpoint = environment.BaseUrl;
    }
  }
  hiringDetails(){
    const endPoint = 'dashboard/hiring'
    return this.http.get(this.serverEndpoint + endPoint).pipe(map((res: any) => {
      return res;
  }));
  }
  empTotalDataInfo(){
    const endPoint = 'dashboard/employees'
    return this.http.get(this.serverEndpoint + endPoint);
  }
  regulaizreInfo(){
    const endPoint = 'dashboard/reg'
    return this.http.get(this.serverEndpoint + endPoint);
  }
  compoffInfo(){
    const endPoint = 'dashboard/compoff'
    return this.http.get(this.serverEndpoint + endPoint);
  }
  allLeavesDepartment(){
    const endPoint = 'dashboard/leave'
    return this.http.get(this.serverEndpoint + endPoint);
  }
  yesterdaylogs(){
    const endPoint = 'dashboard/yesterdaylogs'
    return this.http.get(this.serverEndpoint + endPoint);
  }
  todayAbsents(){
    const endPoint = 'dashboard/todayabsent'
    return this.http.get(this.serverEndpoint + endPoint);
  }
}
