import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted:any = false;
  hidePassword:any=false;
  otp= false ;
  lastDigits:any;
  email:any;
  timeUp:Boolean=true;
  display: any;
  public timerInterval: any;
  interval:any;
  timeLeft:number = 90;
  showPassword=false;

  constructor(private authService:AuthService,public router:Router, public formBuilder:FormBuilder,private toast:NgToastService) {
    this.loginForm = formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
   }
  ngOnInit(): void {    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  } 
  showHidePassword(){
    this.showPassword=!this.showPassword
  }
  onSubmit(){
   this.submitted = true;
   console.log(this.loginForm.value)
   if(this.loginForm.valid){
    console.log(this.loginForm.value)
    this.email = this.loginForm.get('email')?.value;
    this.authService.authMobile(this.loginForm.value).subscribe((res:any)=>{
    console.log('mobile response',res);
    //localStorage.setItem('userOrg',this.email);
    const authDetails:any = JSON.stringify(res);
    const token:any = JSON.stringify(res.token);
    localStorage.setItem('orgName',this.email);
    localStorage.setItem('auth',authDetails);
    localStorage.setItem('token',token);
    this.toast.success({ detail: "SUCCESS", summary: 'Login successful..!' });
    this.router.navigate(['/dashboard']);        
    },
    (errRes)=> {
      this.showerror();
      console.log('error',errRes)
      const userMessage:any = errRes.error.msg;
      this.toast.error({ detail: "Oops..!", summary:userMessage  });
    });   
    return
   }
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }
}
