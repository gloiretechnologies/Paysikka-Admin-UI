import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { HiringService } from 'src/app/shared/services/hiring.service';
import { NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.scss']
})
export class ApplicantsListComponent {
  
  applicantsData: any;
  show = true;
  searchText:any;
  frmDateform:FormGroup;
  noData:boolean=false;
  serverIssue:any=false;
  //date=new Date();
  // fromDate= new FormControl(new Date().toDateString());
  // toDate = new FormControl(new Date().toDateString());
  datedata: any;
  mainFilter: any;
  NoData!: boolean;
  // updateDate(event: any) {
  //   this.date = event.target.valueAsDate;
  // }

	close() {
		this.show = false;
		setTimeout(() => (this.show = true), 3000);
	}
  prvRoute(){
    let myRoute=this.router.url;
    localStorage.setItem('route',myRoute);
  }
  constructor(private hiringService:HiringService,private modalService: NgbModal,private fb:FormBuilder,private toast:NgToastService,
    private router:Router){
    this.getApplicants();
    this.frmDateform = this.fb.group({
      fromdate: new FormControl(''),
      todate: new FormControl('')
    })
  }
  resetFilter(){
    this.frmDateform.reset();
  }
  getApplicants(){
    this.hiringService.applicantsListApi().subscribe((res:any)=>{
      this.applicantsData = res;
      this.mainFilter=res;
      if(this.applicantsData.length ==0){
        this.noData=true;
      }
      console.log('applicantsData',this.applicantsData);
        
    },(err)=>{
      if(err.status == 0){
        this.serverIssue = true;
      }
    })
  }
  currentStatus:any;
  updateStatus(e:any){
    
    const data:any =e.target.value;
    //const statusData:any=JSON.parse(e.target.value);
    // const eData:any=e.target.value;
    // console.log(data)
    const mData:any=JSON.parse(data)
    const id:any =mData.id
    const value:any = mData.value;
    
    console.log(id,value);
    // if(mData=='Scheduled Interview'){
    // }else if(mData =='Received'){
    // }else (mData== 'Scheduled Interview'){
    // }
    switch(mData.value) { 
      case 'Scheduled Interview': { 
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
         break;
      } 
      case 'Rejected': {
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
         break; 
      }
      case 'Offerletter-Relesed':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Offerletter-Hold':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Offerletter-Rejected':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Appointmentletter-Relesed':{ 
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Appointmentletter-Hold':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Appointmentletter-Rejected':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      } 
      case 'Appointmentletter-Relesed':{
        const modalRef = this.modalService.open(ModalComponent,mData);
        modalRef.componentInstance.mData = mData;
        break; 
      }
      case 'Onboarded':{
        this.hiringService.jobStatus({applicationid:id,status:value}).subscribe((res:any)=>{
          console.log('res of def',res);
        })
        this.router.navigate(['/employees/add-employee']);
        break;
      }
      default:{ 
        this.hiringService.jobStatus({applicationid:id,status:value}).subscribe((res:any)=>{
          console.log('res of default',res); 
        })
         break; 
      } 
   } 
   
  }
  dateFilter(){
    this.filtreData();
  }
  filtreData() {
    this.datedata = this.frmDateform.value;
    let fromdate: any = new Date(this.datedata.fromdate);
    let ttday :any= new Date(this.datedata.todate).setHours(24);
    
    if (fromdate > ttday || (fromdate == 'Invalid Date')) {
      this.toast.warning({ detail: "Oops..!", summary: 'Select Valid Date..!' });
    }
    else {
      this.applicantsData = this.mainFilter;
      let filteredData = this.applicantsData.filter((item: any) => {
        const startDateApi =new Date(item.applydate);
    
        console.log(startDateApi,fromdate,ttday);
        if (startDateApi >= fromdate && startDateApi <= ttday) {
          return item; 
        }
      });
      this.applicantsData = filteredData;
      if(this.applicantsData.length ==0){
        this.toast.warning({ detail: "Data not found..!", summary: 'Given date range not available!' });
        this.noData=true;
      }
      console.log(this.applicantsData)
    }
  }

  myfunction(){
    
    
    // const filterData:any = this.applicantsData.filter((item:any) => '2023-02-21T10:23:21.434Z' ==  item. applydate.toDateString() );



  //  const  myarrray:any=[
  //   {
  //     id:'2',
  //     date:'12/02/2020',
  //     name:'satish'
  //   },
  //   {
  //     id:'4',
  //     date:'13/03/2020',
  //     name:'satish'
  //   },
  //   {
  //     id:'3',
  //     date:'12/02/2022',
  //     name:'satish'
  //   },
  //   {
  //     id:'5',
  //     date:'12/02/2023',
  //     name:'satish'
  //   }
  //  ]
//     const data2:any=myarrray.filter('dateBetween', ()=>{
//       return function(data:any, config:any) {
//         if(!data2.isArray(data)) return data;
//         var result :any= [];
//         var start = config.this.fromDate;
//         var end = config.this.toDate;
//         var dateProperty = config.dateProperty;
//         data.forEach((chunk:any)=> {
//             if(chunk[dateProperty].getTime() <= end.getTime() >= start.getTime())
//                result.push(chunk);
//         });
//         console.log('date filter result',result)
//         return result;
//     }
//     }   
//  )
  // console.log('sadfssfdsad',data2);
  // console.log("filter Data", filterData);
  }


}





