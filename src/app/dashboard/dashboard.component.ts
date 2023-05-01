import { DecimalPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DecimalPipe]
})
export class DashboardComponent implements OnInit {
  hiringResData: any;
  public chart: any;
  public chart2: any;
  empdata: any;
  regulaizre: any;
  compoff: any;
  leaves: any;
  serverIssue:any=false;

  constructor(private dashboardService: DashboardService) {
  }

  createChart() {
    let hiringDataLocal: any = (localStorage.getItem('hiringdata'));
    let dataHiringBind = JSON.parse(hiringDataLocal)
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        // labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
        //         '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
        // labels: ['Received','Pending','Screening','Rejected','Scheduled','Offer Letters Released','Appointment Letters Released','Onboarded'
        //          ], 
        labels: ['April-2023'],
        datasets: [
          {
            label: "No of applications Received",
            data: [dataHiringBind.applicationsreceived],
            backgroundColor: '#34282C'
          },
          {
            label: "No of Pending applications",
            data: [dataHiringBind.Shortlisted],
            backgroundColor: '#C04000'
          },
          {
            label: "No of applications Screening",
            data: [dataHiringBind.Screening],
            backgroundColor: '#52595D'
          },
          {
            label: "No of applications Rejected",
            data: [dataHiringBind.Rejected],
            backgroundColor: '#E41B17'
          },
          {
            label: "No of applications Scheduled",
            data: [dataHiringBind.Scheduled_Interview],
            backgroundColor: '#202A44'
          },
          // {
          //   label: "No of applications Scheduled",
          //   data: ['542', '542', '536', '327', '17',
          //         '0.00', '538', '541'],
          //   backgroundColor: '#202A44'
          // },
          {
            label: "No of Offer Letters Released",
            data: [11],
            backgroundColor: '#98AFC7'
          },
          {
            label: "No of Appointment Letters Released",
            data: [dataHiringBind.Appointmentletter_Relesed],
            backgroundColor: '#157DEC'
          },
          {
            label: "Successfully Onboarded",
            data: ['45'],
            backgroundColor: '#228B22'
          },

        ]
      },
      options: {
        aspectRatio: 2.5,
        scales: {
          y: {
            max: 50,
            min: 0,
            ticks: {
              stepSize: 4
            }
          },
          x: {
            beginAtZero: false
          }
        },

      },

    });
    let leaveLocal:any=localStorage.getItem('leaveChart');
    let leaveBind=JSON.parse(leaveLocal)
    this.chart2 = new Chart("MyPieChart", {
      type: 'pie', //this denotes tha type of chart
      data: {
        datasets: [{
          data: [leaveBind.it,leaveBind.DM, leaveBind.HR, leaveBind.Accounts]
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'IT',
          'DIgital Marketing',
          'HR',
          'Accounts'
        ]
      }
    });




  }
  ngOnInit(): void {
    this.dashboardService.regulaizreInfo().subscribe(res => {
      this.regulaizre = res;
      console.log('regular', this.regulaizre)
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true;
      }
    })
    this.dashboardService.compoffInfo().subscribe(res => {
      this.compoff = res;
      console.log('compoff', this.compoff)
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true;
      }
    })
    this.dashboardService.allLeavesDepartment().subscribe(res => {
      this.leaves = res;
      localStorage.setItem('leaveChart',JSON.stringify(this.leaves))
      console.log('leaves', this.leaves)
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true;
      }
    })
    this.dashboardService.empTotalDataInfo().subscribe(res => {
      this.empdata = res;
      console.log('totalEmp', this.empdata);
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true;
      }
    })
    this.dashboardService.hiringDetails().subscribe((res: any) => {
      console.log('hiring Data', res);
      this.hiringResData = res;
      localStorage.setItem('hiringdata', JSON.stringify(this.hiringResData))
    },(err)=>{
      if(err.status==0){
        this.serverIssue = true;
      }
    })  
    this.createChart();

  }
  birthData:any=[
    {
      name: 'sdfsdfsf',
      date: '12/05/2023'
    },
    {
      name: 'sdfsdfsf',
      date: '12/05/2023'
    },
    {
      name: 'sdfsdfsf',
      date: '12/05/2023'
    }
  ]
  alDashboardData() {
    this.dashboardService.regulaizreInfo().subscribe(res => {
      this.regulaizre = res;
      console.log('regular', this.regulaizre)
    })
    this.dashboardService.compoffInfo().subscribe(res => {
      this.compoff = res;
      console.log('compoff', this.compoff)
    })
    this.dashboardService.allLeavesDepartment().subscribe(res => {
      this.leaves = res;
      console.log('leaves', this.leaves)
    })
    this.dashboardService.empTotalDataInfo().subscribe(res => {
      this.empdata = res;
      console.log('totalEmp', this.empdata)
    })
    this.dashboardService.hiringDetails().subscribe((res: any) => {
      console.log('hiring Data', res);
      this.hiringResData = res;
    })
  }
}