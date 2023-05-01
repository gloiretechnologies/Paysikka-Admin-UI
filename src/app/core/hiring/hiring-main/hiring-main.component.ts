import { Component } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { HiringService } from 'src/app/shared/services/hiring.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hiring-main',
  templateUrl: './hiring-main.component.html',
  styleUrls: ['./hiring-main.component.scss']
})
export class HiringMainComponent {

  allPosted: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  serverIssue:any=false;
  tableSizes: any = [3, 6, 9, 12]; 
  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }                                                                                                    
  constructor(private router:Router, private confirmBoxEvokeService: ConfirmBoxEvokeService,private api: HiringService,private toast: NgToastService) {
    this.allPostedJod();
  }


  ngOnInit() {
    this.allPostedJod();

  }
  allPostedJod() {
    this.api.hiringListApi().subscribe(res => {
      this.allPosted = res;
      console.log('req positions list data', this.allPosted)
      // this.allPosted = res;
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true
      }
    })
  }
  prvRoute(){
    let myRoute=this.router.url;
    localStorage.setItem('route',myRoute);
  }
  deleteRequirement(id: any) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.api.deleteReuirement(id).subscribe(res => {
            console.log(res); 
            this.toast.success({ detail: "SUCCESS", summary: 'Data deleted successful..!' });

            this.allPostedJod();
          });
        }
      },(err)=>{
        if(err.status==0){
          this.serverIssue = true
        }
      });
    
   
  }
  showSuccess() {

    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }
  
}
