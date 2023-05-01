import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  serverEndpoint = `${environment.BaseUrl}`;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.serverEndpoint = environment.BaseUrl;
    }
  }
  delEmp(id: any) {
    const EndPoint = `removeemployee/${id}`
    return this.http.delete(this.serverEndpoint + EndPoint);
  }

  addEmpApi(data: any) {
    
    const headers: any = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set("Access-Control-Expose-Headers", "content-disposition");

    const EndPoint = 'employeedetails';
    console.log(data)
    return this.http.post<any>(this.serverEndpoint + EndPoint, data,{headers});
  }

  empListApi() {
    const EndPoint = 'allemployees';
    return this.http.get<any>(this.serverEndpoint + EndPoint);

  }
  empPrimaryUpdateApi(id: any, data: any) {
    const EndPoint = `primarydetails/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);

  }
  empContactUpdateApi(id: any, data: any) {
    const EndPoint = `contactdetails/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);

  }
  empAddressUpdateApi(id: any, data: any) {
    const EndPoint = `address/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  empRealationsUpdateApi(id: any, data: any) {
    const EndPoint = `relationstatus/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  updateRelation(id: any, data: any) {
    const EndPoint = `updaterelation/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  updateExperience(id: any, data: any) {
    const EndPoint = `updateworkexperience/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  updateEducation(id: any, data: any) {
    const EndPoint = `updateeducation/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  empExperianceUpdateApi(id: any, data: any) {
    const EndPoint = `experiencedetails/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  empEducationUpdateApi(id: any, data: any) {
    const EndPoint = `educationdetails/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  empSummeryUpdateApi(id: any, data: any) {
    const EndPoint = `professionalsummary/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  // empDocumentsUpdateApi(id:any,data:any){
  //   const EndPoint=`address/${id}`
  //   return this.http.put<any>(this.serverEndpoint + EndPoint,data);
  // }
  empUpdateBankApi(id: any, data: any) {
    const EndPoint = `bankdetails/${id}`
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
  empLeavesUpdateApi(data: any) {
    const EndPoint = `annualleaves`
    return this.http.post<any>(this.serverEndpoint + EndPoint, data);
  }
  empLeavesListApi(id: any) {
    const EndPoint = `annualleaves/${id}`
    return this.http.get<any>(this.serverEndpoint + EndPoint);
  }

  singleEmpDetailsApi(id: any) {
    const EndPoint = `singleemployee/${id}`;
    return this.http.get<any>(this.serverEndpoint + EndPoint);
  }
  deleteEmpEducation(id: any, data: any) {
    const EndPoint = `education/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  deleteEmpworkExp(id: any, data: any) {
    const EndPoint = `workexperience/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  deleteEmpRelation(id: any, data: any) {
    const EndPoint = `relation/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  deleteEmpLeave(id: any, data: any) {
    const EndPoint = `leave/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }

  expDocument(id: any, data: any) {
    const headers: any = new HttpHeaders();
    headers.set('Accept', 'application/json');
    headers.set("Access-Control-Expose-Headers", "content-disposition");
    const EndPoint = `experiencedoc/${id}`;
    console.log(id)
    console.log(data)
    return this.http.put<any>(this.serverEndpoint + EndPoint, data, { headers });
  }
  aadharDocument(id: any, data: any) {
    const EndPoint = `aadhardoc/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  educationDocument(id: any, data: any) {
    const EndPoint = `educationaldoc/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  bankStatementDoc(id: any, data: any) {
    const EndPoint = `bankstatementdoc/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data)
  }
  panDocument(id: any, data: any) {
    const EndPoint = `pandoc/${id}`;
    return this.http.put<any>(this.serverEndpoint + EndPoint, data);
  }
}


// router.put("/aadhardoc/:employee_id", employeecontroller.uploadaadhardoc);
// router.put("/pandoc/:employee_id", employeecontroller.uploadpandoc);
// router.put("/educationaldoc/:employee_id", employeecontroller.uploadeducationaldoc);
// router.put("/experiencedoc/:employee_id", employeecontroller.uploadexperiencedoc);
// router.put("/bankstatementdoc/:employee_id", employeecontroller.uploadbankstatementdoc);
// const documentsSchema = mongoose.Schema({
//     aadhar: { type: String, required: true },
//     pan: { type: String, required: true },
//     educationaldoc: { type: String, required: true },
//     experiencedoc: { type: String, required: true },
//      : { type: String, required: true }
//   });

