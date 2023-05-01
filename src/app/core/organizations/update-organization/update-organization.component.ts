import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { OrganizationService } from 'src/app/shared/services/organization.service';

@Component({
  selector: 'app-update-organization',
  templateUrl: './update-organization.component.html',
  styleUrls: ['./update-organization.component.scss']
})
export class UpdateOrganizationComponent {

  updateOrganisationForm !: FormGroup;
    submitted = false;
    selectedfile:any;
    postId:any;
    orgData: any;
    img:any;
    logo: any;
    formObj:any
    constructor(private formBuilder: FormBuilder,private activate:ActivatedRoute,private service:OrganizationService) {
      this.updateOrganisationForm= new FormGroup({
        organization_name: new FormControl(''),
        organization_logo: new FormControl(''),
        jobdescription: new FormControl(''),
        Priority: new FormControl(''),
        confirmPassword: new FormControl(''),
        acceptTerms: new FormControl(false),
        }); 
    }
    onfileChange(event:any){
      const file=event.target.files[0];
      this.selectedfile=file;
    }

    ngOnInit(): void {
     this.activate.paramMap.subscribe((res:any)=>{
      this.postId=res.params.id
      this.orgGet(this.postId)
      console.log(this.logo)
     })
  

      this.updateOrganisationForm = this.formBuilder.group(
        {
          organization_name: ['', Validators.required],
          organization_logo:['',]
        },
        
      );
    }

    get f(): { [key: string]: AbstractControl } {
      return this.updateOrganisationForm.controls;
    }
  
    onSubmit(): void {
      this.img=this.orgData.organization_name
      console.log()
      this.submitted = true;
      const orgData:any=new FormData();
      // orgData.append('organization_name',this.updateOrganisationForm.get('organization_name')?.value)
      // if(this.selectedfile == undefined){

      // orgData.append('organization_logo',this.orgData.organization_logo);
      // }else{
      //   orgData.append('organization_logo',this.selectedfile);
      // }

      

      
      if(this.selectedfile == undefined){
        this.formObj={
          organization_name:this.updateOrganisationForm.get('organization_name')?.value,
          organization_logo:this.orgData.organization_logo
        }

      }else{
        this.formObj={
          organization_name:this.updateOrganisationForm.get('organization_name')?.value,
          organization_logo:this.selectedfile
        }
        
      }

      
      if (this.updateOrganisationForm.invalid) {
        this.service.updateOrganisation(this.postId,this.formObj).subscribe((res:any)=>{
          console.log("update res org ",res)
        })
      }
  
      // console.log(JSON.stringify(this.AddOrganisationForm.value, null, 2));
    }

    orgGet(id:any){
      this.service.getSingleOrganization(id).subscribe(res=>{
        res;
        this.orgData=res
        this.logo=res.organization_logo;
        console.log('id data',res)
        this.updateOrganisationForm.patchValue({
          organization_name:res.organization_name,
          organization_logo:res.organization_logo
        })

      })

      
      
    }


  
   
  
    
  


}
