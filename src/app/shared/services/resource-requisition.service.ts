import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceRequisitionService {

  serverEndpoint =`${environment.BaseUrl}`
  constructor(private http:HttpClient) { }


  postresource(data:any){
    const Endpoint=`mrf/status`
    return this.http.put<any>(this.serverEndpoint+Endpoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getresourceList(){
    const  EndPoint=`mrf`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }

  getSingleResource(id:any){
    const  EndPoint=`mrf/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateresourceByManager(data:any){
    const  EndPoint=`mrf/status`
    return this.http.put<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  updateresourceByHR(data:any){
    const  EndPoint=`mrf/manager`
    return this.http.put<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}


