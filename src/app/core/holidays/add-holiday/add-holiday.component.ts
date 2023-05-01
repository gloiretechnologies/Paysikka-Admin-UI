import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidaysService } from 'src/app/shared/services/holidays.service';
import { NgToastService } from 'ng-angular-popup';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent {

  
  holidayForm !: FormGroup;
    submitted = false;
    a:any;

    

      constructor(private formBuilder: FormBuilder,private api:HolidaysService,private  route:Router, private toast: NgToastService) {
        this.holidayForm= new FormGroup({
            holidayname: new FormControl(''),
            date: new FormControl(''),
            jobdescription: new FormControl(''),
            Priority: new FormControl(''),
            confirmPassword: new FormControl(''),
            acceptTerms: new FormControl(false),
          });
          
      }

      ngOnInit(): void {

       
    

        this.holidayForm = this.formBuilder.group(
          {
            holidayname: ['', Validators.required],
            holidaydate: ['',[Validators.required,]],
           // day:['',Validators.required],
            
            // email: ['', [Validators.required, Validators.email]],
            // password: [
            //   '',
            //   [
            //     Validators.required,
            //     Validators.minLength(6),
            //     Validators.maxLength(40)
            //   ]
            // ],
            // confirmPassword: ['', Validators.required],
            // acceptTerms: [false, Validators.requiredTrue]
          },
          
        );
      }

      get f(): { [key: string]: AbstractControl } {
        return this.holidayForm.controls;
      }
    
      onSubmit(): void {
        // debugger;
        this.submitted = true;
        const date1 = new DatePipe('en-US').transform(this.holidayForm.value.holidaydate, 'dd/MM/yyyy')
        const myFormat: any = (new DatePipe('en-US').transform(this.holidayForm.value.holidaydate, 'EEEE, MMMM d, y'))?.split(',');
        const data = {
          holidayname: this.holidayForm.value.holidayname,
          holidaydate: date1,
          day: myFormat[0],
        }
        const hollydayDate= new Date(this.holidayForm.value.holidaydate).setHours(19);
        const today=new Date().setHours(19);
        // console.log(hollydayDate,today);
        // console.log(data);
        if (this.holidayForm.valid && today <= hollydayDate) {
          this.api.postHoliday(data).subscribe((res:any) => {
            console.log(res)
            this.showSuccess()
            this.holidayForm.reset();
            this.submitted=false;
            this.route.navigate(['holidays/holidays-list'])
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
    
      showSuccess() {
    
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      }
      showerror() {
    
        this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
      }
    
      onReset(): void {
        this.submitted = false;
        this.holidayForm.reset();
      }
    
 

}
