import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { SettingsService } from 'src/app/shared/services/settings.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  localId: any;
  orgid: any;
  adminForm!: FormGroup;
  eeadminForm!: FormGroup;
  allAdmin: any;
  submitted: boolean = false;
  addVisible:boolean = false;
  clickedID:any =false;
  constructor(private settings: SettingsService, private fb: FormBuilder, private toast: NgToastService, private confirmBoxEvokeService: ConfirmBoxEvokeService) { }
  ngOnInit(): void {
    this.adminForm = this.fb.group({
      title: new FormControl('', Validators.required),

    })
    this.eeadminForm = this.fb.group({
      roleid: new FormControl(''),
      title: new FormControl('', Validators.required),
    })
    this.getadmin();
  }
  getadmin() {
    this.settings.adminGet().subscribe((res: any) => {
      this.allAdmin = res;
      console.log(res)
    })
  }
  editAdmin(id:any,data:any){
    this.clickedID = id;
    this.eeadminForm.patchValue({
      title: data.title,
      roleid: data.roleid,
    })

  }
  postadmin() {
    this.submitted = true
    if (this.adminForm.valid) {
      this.settings.adminPost(this.adminForm.value).subscribe((res: any) => {
        this.getadmin();
        this.adminForm.reset()
        this.submitted = false;
        this.toast.success({ detail: 'Sucecess..!', summary: 'Admin Created Successfully..!' })
      })
    }
    else {
      return
    }
  }
  editadmin(value: any) {
    this.eeadminForm.patchValue({
      title: value.title,
      roleid: value.roleid,
    })
  }
  removeEdit(id:any){
    if(this.clickedID!==id)
    this.clickedID = '';
  }
  updateAdmin(key:any){
    this.submitted = true;
    if (this.eeadminForm.valid && key.keyCode == 13) {
      let editBodyData = {
        title: this.eeadminForm.get('title')?.value,
      }
      this.settings.adminUpdate(this.eeadminForm.get('roleid')?.value, editBodyData).subscribe((res: any) => {
        this.toast.success({ detail: 'Sucecess..!', summary: res.message })
        //this.eeadminForm.reset();
        this.submitted = false;
        this.clickedID = '';
        this.getadmin();
      },
      err=>{
        this.toast.error({ detail: 'Oops..!', summary: err.error.message })
      })
    }
  }
  eepostadmin() {
    this.submitted = true;
    if (this.eeadminForm.valid) {
      let editBodyData = {
        title: this.eeadminForm.get('title')?.value,
      }
      this.settings.adminUpdate(this.eeadminForm.get('roleid')?.value, editBodyData).subscribe((res: any) => {
        this.toast.success({ detail: 'Sucecess..!', summary: res.message })
        this.eeadminForm.reset();
        this.submitted = false;
        this.getadmin();
      },
      err=>{
        this.toast.error({ detail: 'Oops..!', summary: err.error.message })
      })
    }
  }
  deleteadmin(id: number) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        if (resp.success == true) {
          this.settings.adminDelete(id).subscribe((res: any) => {
            this.toast.success({ detail: 'Sucecess..!', summary: res.message })
            this.getadmin();
          },
          err=>{
            this.toast.error({ detail: 'Oops..!', summary: err.error.message })

          })
        }
      });


  }
  get f(): { [key: string]: AbstractControl } {
    return this.adminForm.controls
  }
  get ff(): { [key: string]: AbstractControl } {
    return this.eeadminForm.controls
  }
}
