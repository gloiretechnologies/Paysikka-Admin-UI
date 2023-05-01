import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';

@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.scss']
})
export class DesignationsComponent {
  allDesig: any;
  desigForm!: FormGroup;
  eedesigForm!: FormGroup;
  allDept: any;
  orgid: any;
  localId: any;
  submitted = false;
  constructor(private settings: SettingsService, private fb: FormBuilder, private toast: NgToastService, private confirmBoxEvokeService: ConfirmBoxEvokeService) { }
  ngOnInit(): void {
    this.localId = localStorage.getItem('auth');
    let Check3 = (JSON.parse(this.localId));
    this.orgid = Check3.admin.orgid
    this.desigForm = this.fb.group({
      title: new FormControl('', Validators.required),
      orgid: new FormControl(this.orgid),
      deptid: new FormControl('', Validators.required),
    })
    this.eedesigForm = this.fb.group({
      designation_id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
    this.getDesig();
    this.getDept();
  }
  getDesig() {
    this.settings.desigGet().subscribe((res: any) => {
      this.allDesig = res;
    })
  }
  getDept() {
    this.settings.deptGet().subscribe((res: any) => {
      this.allDept = res;
    })
  }
  postDesig() {
    this.submitted = true
    if (this.desigForm.valid) {
      this.settings.desigpost(this.desigForm.value).subscribe((res: any) => {
        this.desigForm.reset();
        this.submitted=false;
        this.getDesig();
        this.toast.success({ detail: 'Sucecess..!', summary: res.message })
      },
      err=>{
        this.toast.error({ detail: 'Oops..!', summary: err.error.message })

      })
    }
    else {
      return
    }
  }
  editDesig(value: any) {
    this.eedesigForm.patchValue({
      title: value.title,
      designation_id:value.designation_id,
      description:value.description
    })
  }
  eepostDesig() {
    this.submitted = true;
    if (this.eedesigForm.valid) {
      let editBodyData = {
        title: this.eedesigForm.get('title')?.value,
        description: this.eedesigForm.get('description')?.value
      }
      this.settings.desigUpdate(this.eedesigForm.get('designation_id')?.value, editBodyData).subscribe((res: any) => {
        this.eedesigForm.reset();
        this.submitted=false
        this.toast.success({ detail: 'Sucecess..!', summary: res.message })

        this.getDesig();
      })
    }
  }
  deleteDesig(id: number) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        if (resp.success == true) {
          this.settings.desigDelete(id).subscribe((res: any) => {
            this.toast.success({ detail: 'Sucecess..!', summary: res.message })
            this.getDesig();
          },
          err=>{
            this.toast.error({ detail: 'Oops..!', summary: err.error.message })

          }
          )
        }
      });


  }
  get f(): { [key: string]: AbstractControl } {
    return this.desigForm.controls
  }
  get ff(): { [key: string]: AbstractControl } {
    return this.eedesigForm.controls
  }
}
