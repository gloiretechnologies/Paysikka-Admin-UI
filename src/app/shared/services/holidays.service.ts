import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  
  serverEndpoint =`${environment.BaseUrl}`

  constructor(private http:HttpClient) { }

  getHoliday(){
    const Endpoint='holidayslist'
    return this.http.get<any>(this.serverEndpoint + Endpoint)
    .pipe(map((res:any)=>{
      return res;
    }))

  }

  postHoliday(data:any){
    const Endpoint='createholiday'
    return this.http.post<any>(this.serverEndpoint + Endpoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteHoliday(id:any){
    const Endpoint=`holiday/${id}`
    return this.http.delete<any>(this.serverEndpoint + Endpoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  getSingleholiday(id:number){
    const  EndPoint=`singleholiday/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateholiday(id:any,data:any){
    const  EndPoint=`holidayupdate/${id}`;
    return this.http.post<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
     return res;
   }))
  }
}
