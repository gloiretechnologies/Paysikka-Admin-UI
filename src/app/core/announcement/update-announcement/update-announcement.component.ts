import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-announcement',
  templateUrl: './update-announcement.component.html',
  styleUrls: ['./update-announcement.component.scss']
})
export class UpdateAnnouncementComponent {

  UpdateAnnouncementForm !: FormGroup;
    submitted = false;
    postId:any;
    title:any;
    description:any


    constructor(private formBuilder: FormBuilder, private activatedroute:ActivatedRoute, private api:AnnouncementService ,private route:Router, private toast: NgToastService) {
      this.UpdateAnnouncementForm= new FormGroup({
        title: new FormControl(''),
        description:new FormControl(''),
       
        });
        
    }
   

    ngOnInit(): void {

      this.activatedroute.paramMap.subscribe((res:any)=>{
        this.postId=res.params.id;
        this.singlegetdata(this.postId)
      })

      this.UpdateAnnouncementForm = this.formBuilder.group(
        {
          title: ['', Validators.required],
          description:['',Validators.required]
        },
        
      );
    }

    get f(): { [key: string]: AbstractControl } {
      return this.UpdateAnnouncementForm.controls;
    }
  
    onSubmit(): void {
      this.submitted = true;

     
      if (this.UpdateAnnouncementForm.valid) {
        this.api.updateEnnouncement(this.postId,this.UpdateAnnouncementForm.value).subscribe(res=>{
          this.showSuccess()
          this.UpdateAnnouncementForm.reset()
          this.route.navigate(['announcement/announcements-list'])
        },
        err=>{
          this. showerror()
        })
      }
  
      // console.log(JSON.stringify(this.AddOrganisationForm.value, null, 2));
    }

    showSuccess() {
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
    }
    showerror() {
    
      this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
    }

    singlegetdata(id:any){
      this.api.getsingledataAnnouncement(id).subscribe(res=>{
        res;
        this.UpdateAnnouncementForm.setValue({
          title:res.title,
          description:res.description
        })
      })
    }

    resetData(){
      this.UpdateAnnouncementForm.reset();
    }

}
