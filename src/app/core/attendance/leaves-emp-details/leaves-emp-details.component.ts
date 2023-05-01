import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AttendanceService } from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-leaves-emp-details',
  templateUrl: './leaves-emp-details.component.html',
  styleUrls: ['./leaves-emp-details.component.scss']
})
export class LeavesEmpDetailsComponent {
  dataById: any;
  empID: any;
  searchText: any;
  empdata: [] = [];
  id: any;
  lvdaytype: any;
  date: any;
  lvtype: any;
  strdate: any;
  enddate: any;
  note: any;
  lvstatus: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private attendance: AttendanceService,
    private activeRouter: ActivatedRoute,
    private toast: NgToastService,

  ) {

  }
  ngOnInit(): void {
    this.activeRouter.params.subscribe((res: any) => {
      this.empID = res.id;
      console.log(res)
      this.get(this.empID);
    })
  }
  get(id: any) {
    this.attendance.leavesGetByID(id).subscribe((res: any) => {

      this.dataById = res;
      console.log('LeavesData', this.dataById);
      this.id = this.dataById.employee_id;
      this.lvdaytype = this.dataById.leavedaytype;
      this.date = this.dataById.date;
      this.lvtype = this.dataById.leavetype;
      this.strdate = this.dataById.startdate;
      this.enddate = this.dataById.enddate
      this.lvstatus = this.dataById.leavestatus;
      this.note = this.dataById.note;

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
    const id: any = this.id
    const attendanceStatus: any = { leavestatus: data };
    this.attendance.leaveUpdateStatus(id, attendanceStatus).subscribe((res: any) => {
      console.log(res);
      this.toast.success({ detail: "SUCCESS!", summary: 'Status update successfully..!' });
      this.get(id);
    })
  }

}
