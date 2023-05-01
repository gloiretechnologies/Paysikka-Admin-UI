import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HiringService } from 'src/app/shared/services/hiring.service';
import { Editor } from 'ngx-editor';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit-job-post',
  templateUrl: './edit-job-post.component.html',
  styleUrls: ['./edit-job-post.component.scss']
})
export class EditJobPostComponent {
  jobPostID: any;
  editor: Editor = new Editor;
  html: '' = '';

  responsibilities: any;


  constructor(private router:Router,private toast: NgToastService, private formBuilder: FormBuilder, private activeRouter: ActivatedRoute, private api: HiringService) { }

  submitted = false;
  employePostForm!: FormGroup;
  ngOnInit(): void {
    this.employePostForm = this.formBuilder.group(
      {
        title: new FormControl('', [Validators.required]),
        jobdescription: new FormControl('',
          [
            Validators.required,
            Validators.minLength(10),

          ]
        ),
        responsibilities: new FormControl('',
          [
            Validators.required,
            Validators.minLength(10),

          ]
        ),
        positions: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        status: new FormControl('', Validators.required),

      },

    );
    this.activeRouter.params.subscribe((res: any) => {
      this.jobPostID = res.id;
      console.log(this.jobPostID)

      this.hiringdata(this.jobPostID);
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.employePostForm.controls;
  }
  onSubmit() {
    let map=this.employePostForm.value;
    this.submitted = true;
    if (map.Invalid) {
     return
    }
    this.api.jobUpdateApi(this.jobPostID, this.employePostForm.value).subscribe(res => {
      console.log('jobdetails data res', res)

      this.showSuccess();
      this.submitted = false;
      this.employePostForm.reset();
      this.router.navigate(['/hiring/list-of-jobs']);
    },
      err => {
        this.showerror();
      }
    )
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }
  title: any;
  Positions: any;
  email: any;
  jobdescription: any;
  status: any;

  hiringdata(id: any) {
    this.api.updateJobPostApi(id).subscribe(res => {
      res;
      console.log(res)
      this.title = res[0].title;
      this.Positions = res[0].positions;
      this.email = res[0].email;
      this.jobdescription = res[0].jobdescription;
      this.responsibilities = res[0].responsibilities;
      this.status = res[0].status;

    })
  }
  resetData() {
    this.employePostForm.reset();
  }



}
