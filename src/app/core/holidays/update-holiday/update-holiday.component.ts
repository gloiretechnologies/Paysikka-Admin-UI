import { Component,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HolidaysService } from 'src/app/shared/services/holidays.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-update-holiday',
  templateUrl: './update-holiday.component.html',
  styleUrls: ['./update-holiday.component.scss']
})
export class UpdateHolidayComponent implements OnInit{

  updateholidayForm !: FormGroup;
  submitted = false;
  jobPostID: any;
  holidayname:any;
  holidaydate:any;
  day:any;
  date:any;
  currentId: any;


    constructor(private formBuilder: FormBuilder, private service:HolidaysService ,private router:Router,private activeRouter:ActivatedRoute,private toast: NgToastService) {
      this.updateholidayForm = this.formBuilder.group(
        {
          holidayname: new FormControl('',Validators.required),
          holidaydate:new FormControl('',Validators.required),
          day:new FormControl('',Validators.required),
          
        },
        
      );
    }
    ngOnInit(): void {
      this.activeRouter.paramMap.subscribe((res:any)=>{
        this.jobPostID=res.params.id;
        this.hiringdata(this.jobPostID);
      })


      
    }
   
    hiringdata(id:any){
      this.service.getSingleholiday(id).subscribe(res=>{
        res;
        console.log('id data',res)
        this.updateholidayForm.setValue({
          holidayname: res.holidayname,
          holidaydate:res.holidaydate,
          day:res.day,
        })
        // this.holidayname=res.title;
        // this.holidaydate=res.positions;
        // this.day=res.email;
        // this.date=res.jobdescription;
        // this.currentId=res.holidayid;
      })
    }

   

    get f(): { [key: string]: AbstractControl } {
      return this.updateholidayForm.controls;
    }
  
    onSubmit(): void {
      this.submitted = true;

      // const data:any={
      //   holidayid:this.currentId,
      //   holidayname: this.updateholidayForm.value.holidayname,
      //     holidaydate:this.updateholidayForm.value.holidaydate,
      //     day:this.updateholidayForm.value.day,
      // }
  
      if (this.updateholidayForm.valid) {
        this.service.updateholiday(this.jobPostID,this.updateholidayForm.value).subscribe(res=>{
          console.log('mydata',res)
          this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
          this.submitted = false;
          this.updateholidayForm.reset();
          this.router.navigate(['/holidays/holidays-list'])
        },
        (err)=>{
          this.toast.error({ detail: "Oops..!", summary: err.error.message });
        })
      }
  
     
    }

   
    
  
    onReset(): void {
      this.submitted = false;
      this.updateholidayForm.reset();
    }
  


    
  



}
