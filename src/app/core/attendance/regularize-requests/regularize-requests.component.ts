import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-regularize-requests',
  templateUrl: './regularize-requests.component.html',
  styleUrls: ['./regularize-requests.component.scss']
})
export class RegularizeRequestsComponent {
  searchText!: string;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9, 12];
  requestData: any;
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
  ) {

  }
  ngOnInit(): void {
    this.getRegularizereq();
    this.frmDateform = this.fb.group({
      fromdate: new FormControl(''),
      todate: new FormControl('')
    })
    this.duplicateArray = this.requestData;
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
  getRegularizereq() {
    this.attendance.regularizeGet().subscribe((res: any) => {
      this.requestData = res;
      if (res.length == 0) {
        this.noData = true;
      }
      this.mainFilter = res;
      console.log('LeavesData', this.requestData);
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
    debugger;
    const data: any = e.target.value;
    console.log(data);
    const mData: any = JSON.parse(data)
    console.log(mData);
    const logindate: any = mData.logindate;
    const employee_id: any = mData.employee_id;
    const value: any = mData.value;
    const mydata = {
      employee_id: employee_id,
      logindate: logindate,
      status: value
    }
    this.attendance.regularizeUpdate(mydata).subscribe((res: any) => {
      console.log(res);
      this.getRegularizereq();
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
      this.toast.warning({ detail: "ERROR..!", summary: 'Select Valid Date..!' });
    }
    else {
      this.requestData = this.mainFilter;
      let filteredData = this.requestData.filter((item: any) => {
        const startDateApi = new Date(item.logindate.split('/').reverse().join('-'));
        console.log(startDateApi)
        if (startDateApi >= fromdate && startDateApi <= ttday) {
          return item;
        }
      });
      this.requestData = filteredData;
      if (this.requestData.length == 0) {
        this.noData = true;
        this.toast.warning({ detail: "Data not found..!", summary: 'Given date range not available!' });

      }
    }
  }
  resetFilter() {
    this.noData = false;
    this.requestData = this.mainFilter;
    this.frmDateform.reset();

  }

}
