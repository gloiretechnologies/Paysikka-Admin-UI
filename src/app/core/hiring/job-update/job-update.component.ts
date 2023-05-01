import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HiringService } from 'src/app/shared/services/hiring.service';

@Component({
  selector: 'app-job-update',
  templateUrl: './job-update.component.html',
  styleUrls: ['./job-update.component.scss']
})
export class JobUpdateComponent {
  jobPostID: any;
  responsibilities: any;
  submitted = false;
  employePostForm!:FormGroup;
  constructor(private toast: NgToastService,private formBuilder: FormBuilder,private activeRouter:ActivatedRoute,private api:HiringService){}
  ngOnInit(): void {
    this.employePostForm = this.formBuilder.group(
      {
        title: new FormControl('',[ Validators.required]),
        jobdescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(100)
          ]
        ),
        responsibilities: new FormControl('',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50)
        ]
      ),
        positions: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        status: new FormControl('', Validators.required),
        
      },

    );
      this.activeRouter.params.subscribe((res:any)=>{
      this.jobPostID=res.id;
      this.hiringdata(this.jobPostID);
    })
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.employePostForm.controls;
  }
  onSubmit(): void {
    console.log(this.employePostForm.value)
    this.submitted = true;
    if (this.employePostForm.valid) {
      this.api.jobUpdateApi(this.jobPostID,this.employePostForm.value).subscribe(res => {
        console.log('jobdetails data res', res)

        this.showSuccess();
        this.submitted = false;
        this.employePostForm.reset();
      },
        err => {
          this.showerror();
        }
      )
    }
}
showSuccess() {
  this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
}
showerror() {

  this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
}
title:any;
Positions:any;
email:any;
jobdescription:any;
status:any;

hiringdata(id:any){
  this.api.updateJobPostApi(id).subscribe(res=>{
    res;
    console.log('id data',res)
    this.title=res.title;
    this.Positions=res.positions;
    this.email=res.email;
    this.jobdescription=res.jobdescription;
    this.responsibilities=res.responsibilities;
    this.status=res.status;
    
  })
}
resetData(){
  this.employePostForm.reset();
}


}
