import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class LeavesComponent {
  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  applicantsData: any;
  show = true;
  regularizeForm!: FormGroup;
  frmDateform!: FormGroup;
  submitted = false;
  logID: any;
  duplicateArray: any = []
  serchData: any = [];
  datedata: any;
  fromdatte: any;
  mainFilter: any;
  noData: boolean = false;
  statusFilter: any;
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
    private attendance: AttendanceService,
    private datePipe: DatePipe
  ) {
    this.getLeaves();
  }
  ngOnInit(): void {
    this.frmDateform = this.fb.group({
      fromdate: new FormControl(''),
      todate: new FormControl('')
    })
    this.duplicateArray = this.applicantsData;
    this.regularizeForm = this.fb.group({
      empid: new FormControl(this.logID, [Validators.required]),
      presenty: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      intime: new FormControl('', [Validators.required]),
      outtime: new FormControl('', [Validators.required]),
      note: new FormControl('', [Validators.required])
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
    this.toast.success({ detail: "SUCCESS!", summary: 'Data update successfully..!' });
    this.reset();
  }
  reset() {
    this.regularizeForm.reset();
    this.submitted = false;
  }
  getLeaves() {
    this.attendance.leavesGet().subscribe((res: any) => {
      this.applicantsData = res;
      if (res.length == 0) {
        this.noData = true;
      }
      this.mainFilter = res;
      console.log('LeavesData', this.applicantsData);
    },(err)=>{
      console.log(err);
      if(err.status == 0){
        this.serverIssue = true;
      }
    })
  }
  updateColor(status: any) {
    let mainStaus = status.toUpperCase();
    if (mainStaus == "PENDING") {
      return 'pending';
    } else if (mainStaus == "APPROVED") {
      return 'Approved';
    } else {
      return 'Rejected'
    }
  }
  updateStatus(e: any) {
    const data: any = e.target.value;
    const mData: any = JSON.parse(data);
    const employee_id: number = mData.employee_id;
    const leaveid: number = mData.leaveid;
    const value: string = mData.value;
    const attendanceStatus: any = { leavestatus: value,employee_id:employee_id };
    this.attendance.leaveUpdateStatus(leaveid, attendanceStatus).subscribe((res: any) => {
      console.log(res);
      this.getLeaves();
      this.toast.success({ detail: "SUCCESS!", summary: 'Status update successfully..!' });
    },
      err => {
        this.toast.error({ detail: "Oops...!", summary: err.error.message });
      })
  }
  filtreData() {
    this.datedata = this.frmDateform.value
    let fromdate: any = new Date(this.datedata.fromdate);
    let ttday = new Date(this.datedata.todate);
    if (fromdate > ttday || (fromdate == 'Invalid Date')) {
      this.toast.warning({ detail: "Date Issue..!", summary: 'Select Valid Date..!' });
    }
    else {
      this.applicantsData = this.mainFilter;
      let filteredData = this.applicantsData.filter((item: any) => {
        const startDateApi = new Date(item.startdate.split('/').reverse().join('-'));
        if (startDateApi >= fromdate && startDateApi <= ttday) {
          return item;
        }
      });

      this.applicantsData = filteredData;
      if (this.applicantsData.length == 0) {
        this.noData = true;
        this.toast.warning({ detail: "Data not found..!", summary: 'Given date range not available!' });
      }
    }
  }
  filterStatus(e: any) {
    this.noData = false;
    const selctedStatus = (e.target.value).toUpperCase();
    this.applicantsData = this.mainFilter
    let statusFilter = this.applicantsData.filter((item: any) => {
      let filData = (item.leavestatus).toUpperCase();
      if (filData === selctedStatus) {
        return item;
      }
    });
    this.applicantsData = statusFilter;
    if(this.applicantsData.length <= 0){
      this.toast.warning({ detail: "Data not found..!", summary: 'Given date not available!' });
      this.noData=true;

    }
    console.log(this.applicantsData)
  }
  resetFilter() {
    this.noData = false;
    this.applicantsData = this.mainFilter;
    this.frmDateform.reset();

  }

}
