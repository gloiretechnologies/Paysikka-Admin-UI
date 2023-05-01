import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-attendance-logs',
  templateUrl: './attendance-logs.component.html',
  styleUrls: ['./attendance-logs.component.scss']
})
export class AttendanceLogsComponent {
  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  logsData: any;
  show = true;
  regularizeForm!: FormGroup;
  frmDateform!: FormGroup;
  submitted = false;
  logID: any;
  mainData: any;
  noData: boolean = false;
  employee_ids: any;
  departments: any;
  fullnames: any;
  jobroles: any;
  reg_notes: any;
  serverIssue:any= false;


  onTableDataChange(event: any) {
    this.page = event;
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
  }
  constructor(
      private toast: NgToastService,
    private fb: FormBuilder,
    private attendance: AttendanceService
  ) {

  }
  ngOnInit(): void {
    this.getApplicants();
    this.frmDateform = this.fb.group({
      fromdate: new FormControl(''),
      todate: new FormControl('')
    })
    this.regularizeForm = this.fb.group({
      employee_id: new FormControl('', [Validators.required]),
      reg_status: new FormControl('', [Validators.required]),
      logindate: new FormControl('', [Validators.required]),
      logintime: new FormControl('', [Validators.required]),
      logouttime: new FormControl('', [Validators.required]),
      reg_note: new FormControl('', [Validators.required])
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.regularizeForm.controls
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.regularizeForm.invalid) {
      return;
    }
    console.log(this.regularizeForm.value);
    this.attendance.regularizeUpdate(this.regularizeForm.value).subscribe((res: any) => {
      console.log(res)
      this.toast.success({ detail: "SUCCESS!", summary: 'Data updated successfully..!' });
      this.reset();
      this.getApplicants();
    },
      err => {
        console.log(err)
        this.toast.error({ detail: 'Oops..!', summary: err.error.message })
      })
    // this.toast.success({ detail: "SUCCESS!", summary: 'Data updated successfully..!' });
    // this.reset();
  }
  reset() {
    this.regularizeForm.reset();
    this.submitted = false;
  }
  getApplicants() {
    this.attendance.attendaceLogsGet().subscribe((res: any) => {
      this.logsData = res;
      this.mainData = res;
      console.log('logsdata', this.logsData);
    },(err)=>{
      if(err.status ==0){
        this.serverIssue = true;
      }
    })
  }

  currentStatus: any;

  updateStatus(e: any) {
    const data: any = e.target.value;
    const mData: any = JSON.parse(data)
    const id: any = mData.id
    const value: any = mData.value;
    console.log(id, value);
  }
  updateData(value: any) {
   

    this.regularizeForm.patchValue({
      employee_id: value.employee_id,
      // presenty: '',
      logindate: value.logindate,
      // intime: '',
      // reg_note: value.reg_note,
      // note: value.note,
    })
    this.employee_ids= value.employee_id;
    this.departments= value.department;
    this.fullnames= value.fullname;
    this.jobroles= value.jobrole;
    this.reg_notes= value.reg_note;
  }
  filtreData() {
    let inputData = this.frmDateform.value;
    let fromDate = new Date(inputData.fromdate);
    let toDate = new Date(inputData.todate);
    if (fromDate > toDate) {
      this.toast.warning({ detail: "Date Issue..!", summary: 'Select Valid Date..!' });
    }
    else {
      this.mainData = this.logsData;
      let filteredData = this.logsData.filter((data: any) => {
        let filtredDate = new Date((data.logindate).split('/').reverse().join('-'));
        if (filtredDate >= fromDate && filtredDate <= toDate) {
          return data
        }
      });
      this.logsData = filteredData;
      if (this.logsData.length == 0) {
        this.noData = true;
        this.toast.warning({ detail: "Data not found..!", summary: 'Given date range not available!' });
      }
    }
  }
  resetFilter() {
    this.noData = false;
    this.logsData = this.mainData;
    this.frmDateform.reset();
  }
}
