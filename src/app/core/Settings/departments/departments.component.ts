import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {
  allDept: any;
  localId: any;
  deptForm!: FormGroup;
  eedeptForm!: FormGroup;
  submitted = false;
  orgid: any;
  addVisible:any = false;
  constructor(private settings: SettingsService, private fb: FormBuilder, private toast: NgToastService, private confirmBoxEvokeService: ConfirmBoxEvokeService
  ) { }
  ngOnInit(): void {
    this.localId = localStorage.getItem('auth');
    let Check3 = (JSON.parse(this.localId));
    this.orgid = Check3.admin.orgid
    this.eedeptForm = this.fb.group({
      deptid: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    })
    this.deptForm = this.fb.group({
      orgid: new FormControl(Check3.admin.orgid),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('')
    })
    this.getDept();
  }
  getDept() {
    this.settings.deptGet().subscribe((res: any) => {
      this.allDept = res;
    })
  }
  editDept(value: any) {
    this.eedeptForm.patchValue({
      deptid: value.deptid,
      title: value.title,
      description: value.description
    })
  }
  eeditDept() {
    const editFormData = {
      title: this.eedeptForm.get('title')?.value,
      description: this.eedeptForm.get('description')?.value
    }
    this.settings.deptEdit(editFormData,this.eedeptForm.get('deptid')?.value).subscribe((res: any) => {
      this.eedeptForm.reset();
      this.submitted=false;
      this.getDept();
      this.toast.success({ detail: "SUCCESS!", summary: res.message });
    },
      err => {
        this.toast.error({ detail: "Ooops..!", summary: err.error.message });
      })
  }
  deleteDept(deptid: number) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        if (resp.success == true) {
          this.settings.deptDelete(deptid).subscribe((res: any) => {
            this.getDept();
            this.toast.success({ detail: "SUCCESS!", summary: res.message });
          },
            err => {
              this.toast.error({ detail: "Oops..!", summary: err.error.message });
            }
          )
        }
      });
  }
  postDept() {
    this.submitted=true;
    if(this.deptForm.valid){
      this.settings.deptPost(this.deptForm.value).subscribe((res: any) => {
        this.getDept();
        this.deptForm.reset();
        this.submitted=false;
        this.toast.success({ detail: "SUCCESS..!", summary: res.message });
      },
        err => {
          this.toast.error({ detail: "Ooops..!", summary: err.error.message });
        }
      )
    }
    else{
      return
    }
  
  }
  get f(): { [key: string]: AbstractControl } {
    return this.deptForm.controls
  }
  get ff(): { [key: string]: AbstractControl } {
    return this.eedeptForm.controls
  }
}
