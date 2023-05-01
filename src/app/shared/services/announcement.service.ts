import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  serverEndpoint =`${environment.BaseUrl}`

  constructor(private http:HttpClient) { }

  getAnnouncement(){
    const EndPoint='allannouncements'
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postAnnouncement(data:any){
    const EndPoint='addannouncement'
    return this.http.post<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteAnnouncement(id:any){
    const EndPoint=`announcement/${id}`
    return this.http.delete<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getsingledataAnnouncement(id:any){
    const EndPoint=`announcement/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateEnnouncement(id:any,data:any){
    const EndPoint=`announcement/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
