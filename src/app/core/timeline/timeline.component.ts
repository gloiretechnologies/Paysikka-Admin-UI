import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HiringService } from 'src/app/shared/services/hiring.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
  @ViewChild('htmlData') htmlData!: ElementRef;

  log: any;
  search: any;
  jobId: any;
  submitted: boolean = false;
  activityForm!: FormGroup;
  checkRoute: any;
  filterform!: FormGroup;
  mainData: any;
  noData: boolean = false;
  pathWay!: string;
  constructor(
    private hiring: HiringService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private toast: NgToastService,
  ) {

  }
  ngOnInit(): void {
    this.filterform = this.fb.group({
      fromDate: new FormControl(''),
      toDate: new FormControl('')
    })
    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.jobId = res.params.id;
    });
    this.checkRoute = localStorage.getItem('route')
    if (this.checkRoute == '/hiring/list-of-applicants') {
      this.pathWay = "Applicant's"
      this.getAppTL();
    }
    else {
      this.getJobTL();
      this.pathWay = "Job's"
    }
    this.activityForm = this.fb.group({
      heading: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })
  }
  // figerout which activity available
  findPerticularActivity() {
    if (this.checkRoute == '/hiring/-of-applicants') {
      this.postAppActivity();
    }
    else {
      this.postJobActivity();
    }
  }                                                                                 
  //post job activity
  postJobActivity() {
    this.submitted = true;
    if (this.activityForm.valid) {
      this.hiring.jobActivityPost(this.jobId, this.activityForm.value).subscribe((res: any) => {
        console.log(res);
        this.getJobTL();
        this.activityForm.reset();
        this.submitted = false;
        this.toast.success({ detail: "SUCCESS..!", summary: 'Activity submitted successfully..!' });
      },
        err => {
          console.log(err);
          this.toast.error({ detail: "Ooops..!", summary: err.error.message });
        })
    }
    else {
      return
    }
  }

  //get jobs Timeline
  getJobTL() {
    this.hiring.jobTimeLine(this.jobId).subscribe((res: any) => {
      this.log = res;
      this.mainData = res;
      this.noData = false;
      console.log('jobTimeline by Id', res)
    })
  }

  //get applicants Timeline
  getAppTL() {
    this.hiring.appTimeLine(this.jobId).subscribe((res: any) => {
      this.log = res;
      this.mainData = res;
      this.noData = false;
      console.log('appTimeline by Id', res)
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.activityForm.controls;
  }
  //post applicants activity
  postAppActivity() {
    this.submitted = true;
    if (this.activityForm.valid) {
      this.hiring.appActivityPost(this.jobId, this.activityForm.value).subscribe((res: any) => {
        console.log(res);
        this.getAppTL();
        this.activityForm.reset();
        this.submitted = false;
        this.toast.success({ detail: "SUCCESS", summary: 'Activity submitted successfully..!' });
      },
        err => {
          console.log(err);
          this.toast.error({ detail: "Ooops..!", summary: err.error.message });
        })
    }
    else {
      return
    }
  }
  // Download analize in pdf formate
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 5;
      PDF.addImage(FILEURI, 'PNG', 1, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
  }
  // Filter for date filtering
  fiterDate() {
    let transFromDate = new Date(this.filterform.get('fromDate')?.value);
    let transToDate: any = new Date(this.filterform.get('toDate')?.value).setHours(24);//to set 24nhr aerly for proper formate
    this.log = this.mainData;
    if (transFromDate > transToDate) {
      this.toast.warning({ detail: "Select Valid Date", summary: 'Start date is greater than end date!' });
    }
    else {
      let filteredData = this.log.filter((resDate: any) => {
        let apiDate = new Date(resDate.date)
        if (apiDate >= transFromDate && apiDate <= transToDate) {
          return resDate
        }
      })
      console.log(filteredData)
      this.log = filteredData;
      if (this.log.length == 0) {
        this.noData = true
        this.toast.warning({ detail: "Data not found..!", summary: 'Given date range not available!' });
      }
      else {
        this.noData = false;
      }
    }
  }
  // reset
  resetDate() {
    this.filterform.reset();
    this.log = this.mainData;
    this.noData = false;
  }
}
