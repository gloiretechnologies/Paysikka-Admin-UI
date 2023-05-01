import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent {
  AddOrganisationForm !: FormGroup;
  submitted = false;
  selectedfile: any;
  imageSrc: any;
  dataToSubmit: any;

  constructor(private toast: NgToastService,private formBuilder: FormBuilder, private api: OrganizationService,private router:Router) {
    this.AddOrganisationForm = this.formBuilder.group({
      organization_name: new FormControl('',[Validators.required]),
      organization_logo: new FormControl('',Validators.required),
     
    });

  }
  get f(): { [key: string]: AbstractControl } {
    return this.AddOrganisationForm.controls;
  }
  onFileChange(event: any) {
    debugger;
    const reader = new FileReader();
    if (event.target.files && event.target.files.length){
      const [file] = event.target.files;
      this.selectedfile = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
 
  //this is jagedeesh sent code

  // onSubmit(): void {
  //   const formData = this.AddOrganisationForm.value;
  //   console.log(this.imageSrc)
  //   this.dataToSubmit = {
  //     organization_name: formData.organization_name,
  //     organization_logo: this.imageSrc
  //   };
  //  console.log(this.dataToSubmit);

  //  if(this.AddOrganisationForm.valid){
  //   this.api.organizationPost(this.dataToSubmit).subscribe((res: any) => {
  //     console.log(res);
  //   },
  //     (error) => {
  //     })

  //  }
  // }

 


  //this is my code
  onSubmit(): void {
    this.submitted = true;
    // fitst approch for FormData "orgData"
    const orgData:any=new FormData();
    orgData.append('organization_name',this.AddOrganisationForm.get('organization_name')?.value)
    orgData.append('organization_logo',this.imageSrc)

    // second approch for FormData "formData"
    const formData:any={
      organization_name: this.AddOrganisationForm.get('organization_name')?.value,
      organization_logo:this.imageSrc
    }

    //second approch form Data "formData" i sent to API function
    if (this.AddOrganisationForm.valid) {
      this.api.organizationPost(formData).subscribe(res=>{
        console.log(res)
        this.toast.success({ detail: "SUCCESS!", summary: 'Status update successfully..!' });
        this.AddOrganisationForm.reset();
        this.submitted = false;
      },
      (err)=>{
        this.toast.error({ detail: "Oops...!", summary: err.error.message });
      })
    }

    // console.log(JSON.stringify(this.AddOrganisationForm.value, null, 2));
  }


}
