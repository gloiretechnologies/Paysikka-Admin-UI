import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Editor } from 'ngx-editor';
import { ResourceRequisitionService } from 'src/app/shared/services/resource-requisition.service';

@Component({
  selector: 'app-manager-resource-requisition-form',
  templateUrl: './manager-resource-requisition-form.component.html',
  styleUrls: ['./manager-resource-requisition-form.component.scss']
})
export class ManagerResourceRequisitionFormComponent {
  editor: Editor=new Editor;
  form: FormGroup;
  submitted = false;
  mydata:any;
  mrfId:any
  
  

  constructor(private formBuilder: FormBuilder, private api:ResourceRequisitionService, private toast: NgToastService,private router:Router,) {
    this.form = this.formBuilder.group({
      department: new FormControl(''),
      branch: new FormControl(''),
      required_by:new FormControl(''),
      new_replacement:new FormControl(''),
      designation:new FormControl(''),
      no_of_vacancies:new FormControl(''),
      job_description:new FormControl(''),
      qualification:new FormControl(''),
      experiance:new FormControl(''),
      skills:new FormControl(''),
      other_requirements:new FormControl(''),
      justification:new FormControl(''),
      request_recieved_date:new FormControl(''),
      remarks:new FormControl(''),
      approved_name:new FormControl('',),
      approved_date:new FormControl(''),
      leaving_ename:new FormControl(''),
      date_leaving:new FormControl(''),
      dept_strenght:new FormControl(''),
      strenght_function:new FormControl(''),
      manager_remarks:new FormControl('',Validators.required),
      status:new FormControl('',Validators.required),
      functional_head:new FormControl(''),
     

    });
  }

  ngOnInit(): void {
      // this.form = this.formBuilder.group(
      //   {
      //     department'',Validators.required],
      //     branch'',Validators.required],
      //     required_by'',Validators.required],
      //     new_replacement'',Validators.required],
      //     designation'',Validators.required],
      //     no_of_vacancies'',Validators.required],
      //     job_description'',Validators.required],
      //     qualification'',Validators.required],
      //     experiance'',Validators.required],
      //     skills'',Validators.required],
      //     other_requirements'',Validators.required],
      //     justification'',Validators.required],
      //     request_recieved_date'',Validators.required],
      //     // remarks'',Validators.required],
      //     // approved_name'',Validators.required],
      //     // approved_date'',Validators.required],
      //     // leaving_ename'',Validators.required],
      //     // date_leaving'',Validators.required],
      //     // dept_strenght'',Validators.required],
      //     // strenght_function'',Validators.required],
      //     manager_remarks'',Validators.required],
      //     // status'',Validators.required],
      //     functional_head'',Validators.required]
      //   },
        
      // ;

    this.getData();
  }
  getData(){
    this.api.getresourceList().subscribe(res=>{
      this.mydata=res;
      console.log('mydata',this.mydata)
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
   
    if (this.form.valid) {
      const data:any={
        department: this.form.value.department,
        branch:this.form.value.branch,
        required_by:this.form.value.required_by,
        new_replacement:this.form.value.new_replacement,
        designation:this.form.value. designation,
        no_of_vacancies:this.form.value.no_of_vacancies,
        job_description:this.form.value.job_description,
        qualification:this.form.value.qualification,
        experiance:this.form.value.experiance,
        skills:this.form.value.skills,
        other_requirements:this.form.value.other_requirements,
        justification:this.form.value.justification,
        request_recieved_date:this.form.value.request_recieved_date,
        remarks:this.form.value.remarks,
        approved_name:this.form.value.approved_name,
        approved_date:this.form.value.approved_date,
        leaving_ename:this.form.value.leaving_ename,
        date_leaving:this.form.value.date_leaving,
        dept_strenght:this.form.value.dept_strenght,
        strenght_function:this.form.value.strenght_function,
        manager_remarks:this.form.value.manager_remarks,
        status:this.form.value.status,
        functional_head:this.form.value.functional_head,
        mrf_id:this.mrfId,
        
      }
      this.api.updateresourceByManager(data).subscribe(res=>{
      console.log('res',res)
        this.showSuccess();
        
      },
      err=>{
        this.showerror();
      })
      
      
    }

    // console.log(JSON.stringify(this.form.value));

    
  }
  showSuccess() {
    this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
  }
  showerror() {

    this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
  }

  editorText:any;
  myGetdata(id:any){
    this.api.getSingleResource(id).subscribe(res=>{
      res;
      this.mrfId=res.mrf_id
      console.log('id data',res)
      this.editorText =res.job_description

      const formatApprovedDate:any = new DatePipe('en-US').transform(res.approved_date,'yyyy-MM-dd');
      const dateformet:any = new DatePipe('en-US').transform(res.request_recieved_date,'yyyy-MM-dd');
      
      this.form.patchValue({
        department: res.department,
        no_of_vacancies:res.no_of_vacancies,
        approved_name:res.approved_name,
        designation:res.designation,
        job_description:res.job_description,
        required_by:res.required_by,
        justification:res.justification,
        experiance:res.experiance,
        qualification:res.qualification,
        skills:res.skills,
        other_requirements:res.other_requirements,
        approved_date:formatApprovedDate,
        branch:res.branch,
        new_replacement:res.new_replacement,
        request_recieved_date:dateformet,
        remarks:res.remarks,    
        functional_head:res.functional_head,
        leaving_ename:res.leaving_ename,
        manager_remarks:res.manager_remarks,
        dept_strenght:res.dept_strenght,
        strenght_function:res.strenght_function,
        date_leaving:res.date_leaving,
        status:res.status
      })
      
    })
  }


}
