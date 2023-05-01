import { Component, ElementRef, ViewChild } from '@angular/core';
import { HolidaysService } from 'src/app/shared/services/holidays.service';
import { NgToastService } from 'ng-angular-popup';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.scss']
})
export class HolidaysListComponent {
  // @ViewChild('htmlData') htmlData!: ElementRef;
  holidayData:any;
  page = 4;
  pageSize=10;
  q:any;
  addVisible:any=false;
  holidayForm!: FormGroup;
  submitted = false;
  datecustom2:any = new Date("2022-03-25");
  updateholidayForm!:FormGroup;

  constructor (private api:HolidaysService, private toast: NgToastService, private confirmBoxEvokeService: ConfirmBoxEvokeService,
    private formBuilder:FormBuilder){
    this.holidayForm= this.formBuilder.group({
      holidayname: new FormControl('',[Validators.required]),
      holidaydate: new FormControl('',[Validators.required]),
    });
    this.updateholidayForm = this.formBuilder.group({
      holidayname: new FormControl('',[Validators.required]),
      holidaydate: new FormControl('',[Validators.required]),
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.holidayForm.controls;
  }
  removeEdit(id:any){
    if(this.clickedID!==id)
    this.clickedID = '';
  }

  ngOnInit(){
    this.holidayList();
    // setInterval(()=>{
      
    // },2000)
  }
  serverIssue:any=false;
  holidayList(){
    this.api.getHoliday().subscribe(res=>{
      this.holidayData=res.reverse();
      console.log('data',this.holidayData)
    },(err)=>{
      console.log("check err",err)
      if(err.status == 0){
        this.serverIssue = true;
      }
    })
  }

  onSubmit(): void {
    // debugger;
    this.submitted = true;
    const date1:any = new DatePipe('en-US').transform(this.holidayForm.value.holidaydate, 'yyyy-MM-dd')
    const myFormat: any = (new DatePipe('en-US').transform(this.holidayForm.value.holidaydate, 'EEEE, MMMM d, y'))?.split(',');
    const data:any = {
      holidayname: this.holidayForm.value.holidayname,
      holidaydate: date1,
      day: myFormat[0],
    }
    const hollydayDate= new Date(this.holidayForm.value.holidaydate).setHours(19);
    const today=new Date().setHours(19);
    // console.log(hollydayDate,today);
    // console.log(data);
    if (this.holidayForm.valid) {
      this.api.postHoliday(data).subscribe((res:any) => {
        console.log(res)
        this.showSuccess()
        this.holidayForm.reset();
        this.submitted=false;
        this.addVisible = false;
        this.holidayList();
      },
        err => {
          console.log(err);
        })
    }
else{
  this.toast.warning({ detail: "Oops..!", summary: 'Hollyday date should be upcoming...!' });
}
    // console.log(JSON.stringify(this.holidayForm.value, null, 2));
  }
  clickedID:any;
  editField=false;
  editBtn=false;
  editExperiment(id:any){
    this.editField = true;
    this.clickedID = id;
    //this.editBtn =true
    this.api.getSingleholiday(id).subscribe(res=>{
      res;
      console.log('id data',res);
      const mydate:any = new Date(res.holidaydate);
      const date:any = new DatePipe('en-US').transform(mydate, 'yyyy-MM-dd');
      
      this.updateholidayForm.patchValue({ 
        holidayname: res.holidayname,
        holidaydate:date,
        day:res.day,
      })
    })
  }
  onKeypressEvent(event:any){
    console.log(event)
    

  }
  editSubmit(key:any){
    if (this.updateholidayForm.valid && key.keyCode == 13) {
      this.api.updateholiday(this.clickedID,this.updateholidayForm.value).subscribe(res=>{
        console.log('mydata',res)
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
        this.submitted = false;
        this.clickedID = '';
        this.holidayList();
        //this.updateholidayForm.reset();
        //this.router.navigate(['/holidays/holidays-list'])
      },
      (err)=>{
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }
  }


  deleteHolidayList(id: any) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.api.deleteHoliday(id).subscribe(res => {
            console.log(res); 
            this.toast.success({ detail: "SUCCESS", summary: 'Data deleted successful..!' });
            this.holidayList();
          });
        }
      });
    
  }
  showSuccess() {

    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }
  
  // USERS = [
  //   {
  //     "id": 1,
  //     "name": "Leanne Graham",
  //     "email": "sincere@april.biz",
  //     "phone": "1-770-736-8031 x56442"
  //   },
  //   {
  //     "id": 2,
  //     "name": "Ervin Howell",
  //     "email": "shanna@melissa.tv",
  //     "phone": "010-692-6593 x09125"
  //   },
  //   {
  //     "id": 3,
  //     "name": "Clementine Bauch",
  //     "email": "nathan@yesenia.net",
  //     "phone": "1-463-123-4447",
  //   },
  //   {
  //     "id": 4,
  //     "name": "Patricia Lebsack",
  //     "email": "julianne@kory.org",
  //     "phone": "493-170-9623 x156"
  //   },
  //   {
  //     "id": 5,
  //     "name": "Chelsey Dietrich",
  //     "email": "lucio@annie.ca",
  //     "phone": "(254)954-1289"
  //   },
  //   {
  //     "id": 6,
  //     "name": "Mrs. Dennis",
  //     "email": "karley@jasper.info",
  //     "phone": "1-477-935-8478 x6430"
  //   }
  // ];
  // public openPDF(): void {
  //   let DATA: any = document.getElementById('htmlData');
  //   html2canvas(DATA).then((canvas) => {
  //     let fileWidth = 208;
  //     let fileHeight = (canvas.height * fileWidth) / canvas.width;
  //     const FILEURI = canvas.toDataURL('image/png');
  //     let PDF = new jsPDF('p', 'mm', 'a4');
  //     let position = 5;
  //     PDF.addImage(FILEURI, 'PNG', 1, position, fileWidth, fileHeight);
  //     PDF.save('angular-demo.pdf');
  //   });
  // }
}
