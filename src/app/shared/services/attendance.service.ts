import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  serverEndpoint = `${environment.BaseUrl}`
  constructor(private http: HttpClient) { }
  attendaceLogsGet() {
    const EndPoint = 'employeelogs'
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  compoffGet() {
    const EndPoint = 'compoff';
    return this.http.get<any>(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res
    }))
  }
  regularizeGet() {
    const EndPoint = 'regularizereq';
    return this.http.get(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res;
    }))
  }
  leavesGet() {
    const EndPoint = 'leaveslist'
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  leaveUpdateStatus(id: any, data: any) {
    const EndPoint = `leave/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  regularizeUpdate(data:any){
    const EndPoint=`updateregularizer`;
    return this.http.post<any>(this.serverEndpoint + EndPoint,data)
  }
  compoffUpdate(id:number,data:any){
    const EndPoint= `compoffstatus/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint,data)
  }
  leavesGetByID(id: any) {
    const EndPoint = `leaves/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)                                                           
      .pipe(map((res: any) => {                                   
        return res;
      }))
  }
}


