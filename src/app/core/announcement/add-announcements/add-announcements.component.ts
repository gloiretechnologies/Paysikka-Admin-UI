import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-announcements',
  templateUrl: './add-announcements.component.html',
  styleUrls: ['./add-announcements.component.scss']
})
export class AddAnnouncementsComponent {

  addAnnouncementForm !: FormGroup;
    submitted = false;


    constructor(private formBuilder: FormBuilder, private api:AnnouncementService, private route:Router, private toast: NgToastService) {
      this.addAnnouncementForm= new FormGroup({
        title: new FormControl(''),
        description:new FormControl(''),
       
        });
        
    }
   

    ngOnInit(): void {
  

      this.addAnnouncementForm = this.formBuilder.group(
        {
          title: ['', Validators.required],
          description:['',Validators.required]
        },
        
      );
    }

    get f(): { [key: string]: AbstractControl } {
      return this.addAnnouncementForm.controls;
    }
  
    onSubmit(): void {
      this.submitted = true;

     
      if (this.addAnnouncementForm.valid) {
        this.api.postAnnouncement(this.addAnnouncementForm.value).subscribe(res=>{
          console.log(res)
          this.showSuccess()
          this.addAnnouncementForm.reset()
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

   

}
