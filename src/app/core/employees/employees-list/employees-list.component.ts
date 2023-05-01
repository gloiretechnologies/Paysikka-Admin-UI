import { Component } from '@angular/core';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  allEmpData: any;
  page = 4;
  pageSize=10;
  q:any;
  searchText:any;
  serverIssue:any = false;

  constructor(private empService:EmployeesService,private confirmBoxEvokeService:ConfirmBoxEvokeService,private toast:NgToastService){
    this.getEmpList();
  }

  getEmpList(){
    this.empService.empListApi().subscribe((res:any)=>{
      console.log(res);
      this.allEmpData=res.reverse();
    },(err)=>{
      if(err.status == 0){
        this.serverIssue = true;
      }
    })
  }

  deleteEmployee(id:any){
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
    .subscribe(resp => {
      console.log('resp', resp)
      if (resp.success == true) {
        this.empService.delEmp(id).subscribe((res:any) => {
          console.log(res); 
          this.toast.success({ detail: "SUCCESS", summary: 'Data deleted successful..!' });
          this.getEmpList();

        });
      }
    });
  
 
}
}

  // empList=[
  //   {
  //     empid:253,
  //     empname:'satish kumar penke',
  //     desianation:'Angualr Developer',
  //     department:'IT',
  //     mobile:'9948333534'
  //   },
  //   {
  //     empid:253,
  //     empname:'satish kumar penke',
  //     desianation:'Angualr Developer',
  //     department:'IT',
  //     mobile:'9948333534'
  //   },
  //   {
  //     empid:253,
  //     empname:'satish kumar penke',
  //     desianation:'Angualr Developer',
  //     department:'IT',
  //     mobile:'9948333534'
  //   },
  //   {
  //     empid:253,
  //     empname:'satish kumar penke',
  //     desianation:'Angualr Developer',
  //     department:'IT',
  //     mobile:'9948333534'
  //   },
  //   {
  //     empid:253,
  //     empname:'satish kumar penke',
  //     desianation:'Angualr Developer',
  //     department:'IT',
  //     mobile:'9948333534'
  //   }
  // ]


