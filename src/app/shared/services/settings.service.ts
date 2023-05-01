import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, endWith, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  serverEndpoint = `${environment.BaseUrl}`

  constructor(private http: HttpClient) { }
  // Departments
  deptGet() {
    const EndPoint = 'departments'
    return this.http.get<any>(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res
    }))
  }
  deptEdit(data: any, deptid: number) {
    const EndPoint = `departments/${deptid}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deptPost(data: any) {
    const EndPoint = `departments`;
    return this.http.post<any>(this.serverEndpoint + EndPoint, data);
  }
  deptDelete(deptid: number) {
    const Endpoint = `departments/${deptid}`
    return this.http.delete<any>(this.serverEndpoint + Endpoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  // Designitions
  desigGet(): Observable<any> {
    const EndPoint = `designation`
    return this.http.get(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res
    }))
  }
  desigpost(data: any) {
    const EndPoint = `designation`;
    return this.http.post(this.serverEndpoint + EndPoint, data).pipe(map((res: any) => {
      return res
    }))
  }
  desigUpdate(designation_id: number, data: any) {
    const EndPoint = `designation/${designation_id}`;
    return this.http.put(this.serverEndpoint + EndPoint, data).pipe(map((res: any) => {
      return res
    }))
  }
  desigDelete(designation_id: number) {
    const EndPoint = `designation/${designation_id}`;
    return this.http.delete(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res
    }))
  }
  // Admin
  adminGet() {
    const EndPoint = `admintype`;
    return this.http.get(this.serverEndpoint + EndPoint).pipe(map((res: any) => {
      return res
    }))
  }
  adminPost(data: any) {
    const EndPoint = `admintype`;
    return this.http.post(this.serverEndpoint + EndPoint, data).pipe(map((res: any) => {
      return res
    }))
  }
  adminUpdate(id: number,data:any) {
    const EndPoint = `admintype/${id}`;
    return this.http.put(this.serverEndpoint + EndPoint,data).pipe(map((res: any) => {
      return res
    }))
  }
  adminDelete(id:number){
    const EndPoint=`admintype/${id}`;
    return this.http.delete(this.serverEndpoint+EndPoint).pipe(map((res:any)=>{
      return res
    }))
  }
}
