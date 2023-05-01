import { Component } from '@angular/core';
import { OrganizationService } from 'src/app/shared/services/organization.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-list-of-organization',
  templateUrl: './list-of-organization.component.html',
  styleUrls: ['./list-of-organization.component.scss']
})
export class ListOfOrganizationComponent {

  // selectedFile: ImageSnippet;
  organizationData:any;
  page = 4;
  pageSize=10;
  q:any;

  constructor (private api:OrganizationService, private confirmBoxEvokeService: ConfirmBoxEvokeService,  private toast: NgToastService){}
  

  ngOnInit(){
    this.organizationList()
  }
  organizationList(){
    this.api.organizationget().subscribe(res=>{
      this.organizationData=res;
      console.log('organizationData',this.organizationData)
    })
  }

  // organizationDeleteData(id:any){
  //   if(confirm('Are you sure want to delete your data'))
  //   this.api.(id).subscribe(res=>{
  //     console.log(res); 
  //     alert('your data deleted succssfully')
  //     this.organizationList()

  //   })
  // }
  
  organizationDeleteData(id: any) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.api.organizationDelete(id).subscribe(res => {
            console.log(res); 
            this.toast.success({ detail: "SUCCESS", summary: 'Data deleted successful..!' });

            this.organizationList();
          });
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
