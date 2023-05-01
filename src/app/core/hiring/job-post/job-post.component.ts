import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HiringService } from 'src/app/shared/services/hiring.service';
import { NgToastService } from 'ng-angular-popup';
import { Editor } from 'ngx-editor';
import { Router } from '@angular/router';
import { ResourceRequisitionService } from 'src/app/shared/services/resource-requisition.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent {
  editor: Editor=new Editor;
  html: ''='';
  mrfId:any;
  editorText:any;
  hrId: any;
  constructor(private formBuilder: FormBuilder, private api: HiringService, private toast: NgToastService,private router:Router,private mrfService:ResourceRequisitionService) { }
  submitted = false;
  
  employePostForm!: FormGroup;
  allhiringdata: any;
  ngOnInit(): void {
    let orgEmail=localStorage.getItem('orgName');
    this.hrId=localStorage.getItem('hrfrmId')
    this.getsingl();
    this.employePostForm = this.formBuilder.group(
      {
        title: new FormControl('', [Validators.required]),
        jobdescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(10),
          ]
        ),
        // responsibilities: new FormControl('',
        // ),
        positions: new FormControl('', Validators.required),
        email: new FormControl(orgEmail, [Validators.required, Validators.email]),
        status: new FormControl('', Validators.required),
        orgid:new FormControl(localStorage.getItem('token')),
        priority: new FormControl('',[Validators.required])

      },

    );

  }

  get f(): { [key: string]: AbstractControl } {
    return this.employePostForm.controls;
  }

  onSubmit(): void {
    // console.log(this.form.value)
    this.submitted = true;
    console.log(this.employePostForm.value)
    if (this.employePostForm.valid) {
      this.api.jobDetailApi(this.employePostForm.value).subscribe(res => {
        console.log('jobdetails data res', res)

        this.showSuccess();
        this.submitted = false;
        this.employePostForm.reset();
        this.router.navigate(['/hiring/list-of-jobs']);
      },
        err => {
          this.toast.error({ detail: "Oops..!", summary: err.error.message });
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
  onReset(): void {
    this.submitted = false;
    this.employePostForm.reset();
  }

  
getsingl(){
  this.mrfService.getSingleResource(this.hrId).subscribe((res:any)=>{
   console.log('datafrmHrform', res);
   this.editorText =res.job_description
this.employePostForm.patchValue({
  title:res.designation,
  jobdescription:res.job_description,
  positions:res.no_of_vacancies,
  status:res.status,

})
  })
}

}