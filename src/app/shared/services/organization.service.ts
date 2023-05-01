import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  serverEndpoint =`${environment.BaseUrl}`

  constructor(private http:HttpClient) { }

  organizationget(){
    const Endpoint='organizationlist'

    return this.http.get<any>(this.serverEndpoint + Endpoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  organizationDelete(id:any){
    const Endpoint=`organization/${id}`
    return this.http.delete<any>(this.serverEndpoint + Endpoint)
    .pipe(map((res:any)=>{
      return res;
    }))
    
  }
  organizationPost(data:any){
    const Endpoint='organization';
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Type': 'formData'
    });
    return this.http.post<any>(this.serverEndpoint + Endpoint,data,{headers})
    .pipe(map((res:any)=>{
      return res;
    }))

  }

  getSingleOrganization(id:number){
    const  EndPoint=`organization/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateOrganisation(id:any,data:any){
    const EndPoint = `organization/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
