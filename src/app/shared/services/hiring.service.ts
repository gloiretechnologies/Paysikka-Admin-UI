import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HiringService {

  serverEndpoint = `${environment.BaseUrl}`

  constructor(private http: HttpClient) { }
  jobPostApi(data: any) {
    const EndPoint = 'employeedetails'
    return this.http.post<any>(this.serverEndpoint + EndPoint, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  jobDetailApi(data: any) {
    const EndPoint = 'jobposition'
    return this.http.post<any>(this.serverEndpoint + EndPoint, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  hiringListApi() {
    const EndPoint = 'alljobpositions'
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateJobPostApi(id: number) {
    const EndPoint = `jobpositionsingle/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  applicantsListApi() {
    const EndPoint = 'allapplicants';
    // let headers: any = new HttpHeaders().set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZWYxYzk3ZGE1NTg4Y2RhNWM3OGZiZCIsIm5hbWUiOiJzb3VteWEiLCJlbWFpbCI6InNvdW15YUBnbWFpbC5jb20iLCJtb2JpbGUiOjcwOTU2MTQ4NjQsImNyZWF0ZWRBdCI6IjIwMjMtMDItMTdUMDY6MjA6MDcuODEwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDItMTdUMDY6MjA6MDcuODEwWiIsImFkbWluX2lkIjoxLCJfX3YiOjAsInBhc3N3b3JkIjoiZ3MxMjM0In0sImlhdCI6MTY3Njk3MDIyMX0.m0PsofmO0WiecGGo74ImXB-Rte6KWHOYCdfrSXmR6VA');
    return this.http.get<any>(this.serverEndpoint + EndPoint);
  }
  deleteReuirement(id: any) {
    const endPoind = `jobposition/${id}`
    return this.http.delete<any>(this.serverEndpoint + endPoind)
  }
  registerPost(data: any) {
    const EndPoint = 'register'
    return this.http.post<any>(this.serverEndpoint + EndPoint, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  jobStatus(data: any) {
    const EndPoint = 'application'
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  jobUpdateApi(id: any, data: any) {
    const EndPoint = `jobposition/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  // JobActivity
  jobActivityPost(jobid: any, data: any) {
    const EndPoint = `jobactivity/${jobid}`;
    return this.http.post<any>(this.serverEndpoint + EndPoint, data).pipe(map((res: any) => {
      return res;
    }))
  }
  jobTimeLine(jobid: any) {
    const EndPoint = `jobactivity/${jobid}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  // application Activity
  appActivityPost(appId:any,data:any){
    const EndPoint = `applicationactivity/${appId}`;
    return this.http.post<any>(this.serverEndpoint + EndPoint, data).pipe(map((res: any) => {
      return res;
    }))
  }
  appTimeLine(appId: any) {
    const EndPoint = `applicationactivity/${appId}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  applyJobApi(data:any){
    const headers: any = new HttpHeaders();
    headers.set('Accept', 'application/json');
    //headers.set("Access-Control-Expose-Headers", "content-disposition");
    // headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    //headers.set('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'multipart/form-data');

    const EndPoint = 'jobapplication';
    return this.http.post(this.serverEndpoint + EndPoint,data)
      // .pipe(map((res: any) => {
      //   return res;
      // }))

  }
}
