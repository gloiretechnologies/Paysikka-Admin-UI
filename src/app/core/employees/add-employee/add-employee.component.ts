import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { EmployeesService } from 'src/app/shared/services/employees.service';
import { HiringService } from 'src/app/shared/services/hiring.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  active = 1;
  empForm!: FormGroup;
  selectedfile: any;
  imageSrc: any;

  constructor(private confirmBoxEvokeService: ConfirmBoxEvokeService, private formBuilder: FormBuilder, private api: EmployeesService, private toast: NgToastService) {

  }
  submitted = false;
  ngOnInit(): void {
    this.empForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required,Validators.minLength(10), Validators.maxLength(10)]),
      department: new FormControl('', Validators.required),
      jobrole: new FormControl('', Validators.required),
      dateofjoining: new FormControl('', Validators.required),
      dateofbirth: new FormControl('', Validators.required),
      //companyname: new FormControl('', Validators.required),
      employeeimage: new FormControl(''),
      password: new FormControl('', Validators.required)
    })

  }
  get f(): { [key: string]: AbstractControl } {
    return this.empForm.controls;
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedfile = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
  onSubmit(): void {
    this.submitted = true;
    const changeFormatDateOfJoining: any = new DatePipe('en-US').transform(this.empForm.value.dateofjoining, 'dd/MM/yyyy');
    const changeFormatDateofbirth: any = new DatePipe('en-US').transform(this.empForm.value.dateofbirth, 'dd/MM/yyyy');
    const formData: any = {
      firstname: this.empForm.get('firstname')?.value,
      lastname: this.empForm.get('lastname')?.value,
      email: this.empForm.get('email')?.value,
      phone: this.empForm.get('phone')?.value,
      department: this.empForm.get('department')?.value,
      jobrole: this.empForm.get('jobrole')?.value,
      //dateofjoining: this.empForm.get('dateofjoining')?.value,
      dateofjoining:changeFormatDateOfJoining,
      //dateofbirth: this.empForm.get('dateofbirth')?.value,
      dateofbirth:changeFormatDateofbirth,
      employeeimage: this.imageSrc,
      password: this.empForm.get('password')?.value
    }
    console.log('add emp data',formData)
    var stringLength = this.imageSrc.length;
    var sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;
    console.log(stringLength);
    console.log(sizeInBytes);
    console.log(sizeInKb);
    if (sizeInKb > 65) {
      this.toast.error({ detail: "Oops...!", summary: 'File size must be below 60kb'});
    } else {
      if (this.empForm.valid) {
        this.api.addEmpApi(formData).subscribe((res) => {
          console.log('emp res', res);
          this.empForm.reset();
          this.submitted = false;
          this.toast.success({ detail: "SUCCESS!", summary: 'Status update successfully..!' });
        },
          (err) => {
            this.toast.error({ detail: "Oops...!", summary: err.error.message });
          }
        )
      } else {
        this.empForm.markAllAsTouched();
      }
    }
  }
  onReset(): void {
    this.submitted = false;
    this.empForm.reset();
  }
}
