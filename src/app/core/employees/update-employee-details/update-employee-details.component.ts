import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { EmployeesService } from 'src/app/shared/services/employees.service';

@Component({
  selector: 'app-update-employee-details',
  templateUrl: './update-employee-details.component.html',
  styleUrls: ['./update-employee-details.component.scss']
})
export class UpdateEmployeeDetailsComponent {
  submitted1 = false;
  submitted2 = false;
  submitted3 = false;
  submitted4 = false;
  submitted5 = false;
  submitted6 = false;
  submitted7 = false;
  submitted8 = false;
  submitted9 = false;
  submitted10 = false;

  empID: any;
  singleEmpData: any;
  relationsData: any;
  expData: any;
  educationalData: any;


  empPrimaryDetailsForm!: FormGroup;
  empContactDetailsForm!: FormGroup;
  empAddressDetailsForm!: FormGroup;
  empRelationsDetailsForm!: FormGroup;
  empExperianceDetailsForm!: FormGroup;
  empEducationDetailsForm!: FormGroup;
  ProfessionalsummaryForm!: FormGroup;
  documentsForm!: FormGroup;
  empBankForm!: FormGroup;
  empAddLeavesForm!: FormGroup;
  leavesData: any;
  empLeavesList: any;
  relationBoolean: any = false;
  expBoolean: any = false;
  educationBoolean: any = false;
  empLeavesBoolean: any = false;
  selectedfile: any;
  imageSrc: any;
  selectedfile1: any;
  employeeImage: any;
  wantUpdate: boolean = false;
  eduDoc: any;





  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private toast: NgToastService,
    private confirmBoxEvokeService: ConfirmBoxEvokeService
  ) {


    this.activatedRoute.paramMap.subscribe((res: any) => {
      this.empID = res.params.id;
    });
    this.getEmpDetails();

    this.empPrimaryDetailsForm = this.formBuilder.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      displayname: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      dateofbirth: new FormControl('', Validators.required),
      maritalstatus: new FormControl('', Validators.required),
      bloodgroup: new FormControl('', Validators.required),
      physicallyhandicapped: new FormControl('', Validators.required)
    }),

      this.empContactDetailsForm = this.formBuilder.group({
        workemail: new FormControl('', [Validators.required, Validators.email]),
        personalemail: new FormControl('', [Validators.required, Validators.email]),
        mobile: new FormControl('', [Validators.required]),
        workphone: new FormControl('', Validators.required),
        residencephone: new FormControl('', [Validators.required])
      }),
      this.empAddressDetailsForm = this.formBuilder.group({
        presentaddress: new FormControl('', [Validators.required]),
        presentaddresspin: new FormControl('', Validators.required),
        permanentaddress: new FormControl('', [Validators.required]),
        permanentaddresspin: new FormControl('', [Validators.required]),
      }),
      this.empRelationsDetailsForm = this.formBuilder.group({
        relationid: new FormControl(''),
        relationtype: new FormControl('', [Validators.required]),
        fullname: new FormControl('', Validators.required),
        mobile: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
      }),
      this.empExperianceDetailsForm = this.formBuilder.group({
        experienceid: new FormControl(''),
        designation: new FormControl('', [Validators.required]),
        reportingto: new FormControl('', [Validators.required]),
        fromto: new FormControl('', [Validators.required]),
        mainwork: new FormControl('', [Validators.required]),
        organizationname: new FormControl('', [Validators.required]),
        expinyears: new FormControl('', [Validators.required]),
        salary: new FormControl('', [Validators.required])
      }),
      this.empEducationDetailsForm = this.formBuilder.group({
        educationid: new FormControl(''),
        type: new FormControl('', [Validators.required]),
        institutename: new FormControl('', [Validators.required]),
        yearpassed: new FormControl('', [Validators.required]),
        group: new FormControl('', [Validators.required]),
        grade: new FormControl('', [Validators.required])
      }),
      this.ProfessionalsummaryForm = this.formBuilder.group({
        langspeak: new FormControl('', [Validators.required]),
        langread: new FormControl('', Validators.required),
        strenths: new FormControl('', Validators.required),
        weakness: new FormControl('', Validators.required),
        professionalsummary: new FormControl('', Validators.required)

      }),
      this.documentsForm = this.formBuilder.group({
        aadhar: new FormControl('', [Validators.required]),
        pan: new FormControl('', Validators.required),
        experience: new FormControl('', Validators.required),
        educationdetails: new FormControl('', Validators.required),
        bankstatement: new FormControl('', Validators.required)
      })
    this.empBankForm = this.formBuilder.group({
      accountno: new FormControl('', [Validators.required]),
      accountantname: new FormControl('', [Validators.required]),
      bankname: new FormControl('', [Validators.required]),
      branch: new FormControl('', [Validators.required]),
      ifscno: new FormControl('', [Validators.required]),
    }),
      this.empAddLeavesForm = this.formBuilder.group({
        annualleaves: new FormControl('', [Validators.required]),
        leavetype: new FormControl('', [Validators.required]),
        consumed: new FormControl('', [Validators.required]),
      })
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.empPrimaryDetailsForm.controls
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.empContactDetailsForm.controls
  }
  get f3(): { [key: string]: AbstractControl } {
    return this.empAddressDetailsForm.controls
  }
  get f4(): { [key: string]: AbstractControl } {
    return this.empRelationsDetailsForm.controls
  }
  get f5(): { [key: string]: AbstractControl } {
    return this.empExperianceDetailsForm.controls
  }
  get f6(): { [key: string]: AbstractControl } {
    return this.empEducationDetailsForm.controls
  }
  get f7(): { [key: string]: AbstractControl } {
    return this.ProfessionalsummaryForm.controls
  }
  get f8(): { [key: string]: AbstractControl } {
    return this.documentsForm.controls
  }
  get f9(): { [key: string]: AbstractControl } {
    return this.empBankForm.controls
  }
  get f10(): { [key: string]: AbstractControl } {
    return this.empAddLeavesForm.controls
  }

  onFileChange1(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectedfile1 = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;

      };
    }
  }

  onFileChange(event: any) {

    var fileInput: any = document.getElementById('file');
    var filePath: any = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.pdf)$/i;

    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
      //return false;
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.imageSrc = "data:@file/pdf;base64" + this.imageSrc.substring(27)
        };
      }

    }
  }
  onFileChangeDocExp(event: any) {
    var fileInput: any = document.getElementById('expfile');
    var filePath: any = fileInput.value;
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.imageSrc = "data:@file/pdf;base64" + this.imageSrc.substring(27);
        };
      }

    }
  }
  onFileChangeDocAadhar(event: any) {
    var fileInput: any = document.getElementById('aadharfile');
    var filePath: any = fileInput.value;
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.imageSrc = "data:@file/pdf;base64" + this.imageSrc.substring(27);
        };
      }
    }
  }
  onFileChangeEdu(event: any) {
    var fileInput: any = document.getElementById('edufile');
    var filePath: any = fileInput.value;
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
      //return false;
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.eduDoc = reader.result as string;
          this.eduDoc = "data:@file/pdf;base64" + this.eduDoc.substring(27)
        };
      }
    }
  }
  onFileChangeBank(event: any) {
    var fileInput: any = document.getElementById('bankfile');
    var filePath: any = fileInput.value;
    // Allowing file type
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
      //return false;
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.imageSrc = "data:@file/pdf;base64" + this.imageSrc.substring(27)
        };
      }
    }
  }
  onFileChangepan(event: any) {

    var fileInput: any = document.getElementById('panfile');
    var filePath: any = fileInput.value;
    // Allowing file type
    var allowedExtensions = /(\.pdf)$/i;
    if (!allowedExtensions.exec(filePath)) {
      this.toast.error({ detail: "Invalid File Type", summary: "Valid Only PDF Format" });
      fileInput.value = '';
      //return false;
    } else {
      const reader = new FileReader();
      if (event.target.files && event.target.files.length) {
        const [file] = event.target.files;
        this.selectedfile = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.imageSrc = "data:@file/pdf;base64" + this.imageSrc.substring(27)
        };
      }
    }
  }


  submitexpDocument(doc: any) {
    const id: any = this.empID;
    const data: any = {
      experiencedoc: this.imageSrc
    }
    console.log('sdsd', data);
    console.log(doc.form.controls.experience.value);
    this.empService.expDocument(id, data).subscribe((res: any) => {
      console.log('exp doc', res);
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      this.getEmpDetails();
    }, (error) => {
      this.toast.error({ detail: "Oops..!", summary: error.error.message });
    })
  }
  submitaadharDocument(doc: any) {
    const id: any = this.empID;
    const data: any = { aadhardoc: this.imageSrc }
    console.log('sdsd', data);
    console.log(doc.form.controls.aadhar.value);
    this.empService.aadharDocument(id, data).subscribe((res: any) => {
      console.log('aadhar doc', res);
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      this.getEmpDetails();
    }, (error) => {
      this.toast.error({ detail: "Oops..!", summary: error.error.message });
    })
  }
  submitEducationalDocument(doc: any) {
    const id: any = this.empID;

    //method1
    const formdata = new FormData();
    formdata.append("educationaldoc", this.eduDoc)
    console.log('formData', formdata)

    //method2
    const data: any = { educationaldoc: this.eduDoc }
    console.log('sdsd', data);
    console.log(doc.form.controls.educationaldoc.value);
    this.empService.educationDocument(id, data).subscribe((res: any) => {
      console.log('educational doc', res);
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      this.getEmpDetails();
    }, (err) => {
      this.toast.error({ detail: "Oops..!", summary: err.error.message });
    })

  }
  submitBankDocument(doc: any) {
    const id: any = this.empID;
    const data: any = { bankstatementdoc: this.imageSrc }
    console.log('sdsd', data);
    console.log(doc.form.controls.bankstatementdoc.value);
    this.empService.bankStatementDoc(id, data).subscribe((res: any) => {
      console.log('bank doc', res);
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      this.getEmpDetails();
    }, (err) => {
      this.toast.error({ detail: "Oops..!", summary: err.error.message });
    })
  }

  submitPanDocument(doc: any) {
    const id: any = this.empID;
    const data: any = { pandoc: this.imageSrc }
    console.log('sdsd', data);
    console.log(doc.form.controls.pan.value);
    this.empService.panDocument(id, data).subscribe((res: any) => {
      console.log('pan doc', res);
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      this.getEmpDetails();
    }, (error) => {
      this.toast.error({ detail: "Oops..!", summary: error.error.message });
    })
  }



  ngOnInit() {
    this.getEmpDetails();
    console.log('sfsfs', this.singleEmpData);
    this.getEmpLeaves();

  }

  getEmpLeaves() {
    const id = this.empID;
    this.empService.empLeavesListApi(id).subscribe((res: any) => {
      this.empLeavesList = res;
      console.log('Leaves List', res);
    })
  }

  expDocument: any;
  aadhar: any;
  pan: any;
  bankStatement: any;
  eduDocument: any;
  empname: any;
  empJobrole: any;
  empDepartment: any;
  empEmail: any;
  empPhone: any;

  getEmpDetails() {
    const id: any = this.empID;
    this.empService.singleEmpDetailsApi(id).subscribe((res: any) => {
      this.singleEmpData = res;
      console.log("single Data2", this.singleEmpData);
      //Header profile
      this.employeeImage = this.singleEmpData?.employeeimage;
      this.empname = this.singleEmpData?.firstname + " " + this.singleEmpData.lastname;
      this.empJobrole = this.singleEmpData?.jobrole;
      this.empDepartment = this.singleEmpData?.department;
      this.empEmail = this.singleEmpData?.email;
      this.empPhone = this.singleEmpData?.phone;

      this.relationsData = this.singleEmpData?.relationdetails;
      console.log('sdffs relations', this.relationsData);
      if (this.relationsData?.length <= 0) {
        this.relationBoolean = true;
      }
      this.expData = this.singleEmpData?.workexperience;
      if (this.expData?.length <= 0) {
        this.expBoolean = true;
      }
      this.educationalData = this.singleEmpData?.educationdetails;
      if (this.educationalData?.length <= 0) {
        this.educationBoolean = true;
      }
      this.leavesData = this.singleEmpData?.leavesdetails;

      if (this.leavesData?.length <= 0) {
        this.empLeavesBoolean = true;
      }
      this.expDocument = this.singleEmpData.documentdetails?.experiencedoc;
      this.aadhar = this.singleEmpData.documentdetails?.aadhardoc;
      this.eduDocument = this.singleEmpData.documentdetails?.educationaldoc;
      this.pan = this.singleEmpData.documentdetails?.pandoc;
      this.bankStatement = this.singleEmpData.documentdetails?.bankstatementdoc;



      console.log('education Details', this.educationalData)

      console.log('asdasdadsad', this.singleEmpData.firstname);
      const firstname: any = this.singleEmpData.firstname;
      const lastname: any = this.singleEmpData.lastname;
      const displayname: any = this.singleEmpData.primarydetails[0]?.displayname;
      const gender: any = this.singleEmpData.primarydetails[0]?.gender;
      const dateofbirth: any = this.singleEmpData.dateofbirth;
      const maritalstatus: any = this.singleEmpData.primarydetails[0]?.maritalstatus;
      const bloodgroup: any = this.singleEmpData.primarydetails[0]?.bloodgroup;
      const physicallyhandicapped: any = this.singleEmpData.primarydetails[0]?.physicallyhandicapped
      this.empPrimaryDetailsForm.patchValue({
        firstname: firstname,
        lastname: lastname,
        displayname: displayname,
        gender: gender,
        dateofbirth: dateofbirth,
        maritalstatus: maritalstatus,
        bloodgroup: bloodgroup,
        physicallyhandicapped: physicallyhandicapped
      }),
        // this.empPrimaryDetailsForm.setValue({
        //   firstname: firstname,
        //   lastname: this.singleEmpData.lastname,
        //   displayname: this.singleEmpData.primarydetails[0].displayname,
        //   gender: this.singleEmpData.primarydetails[0].gender,
        //   dateofbirth:this.singleEmpData.primarydetails[0].dateofbirth ,
        //   maritalstatus: this.singleEmpData.primarydetails[0].maritalstatus,
        //   bloodgroup: this.singleEmpData.primarydetails[0].bloodgroup,
        //   physicallyhandicapped: this.singleEmpData.primarydetails[0].physicallyhandicapped
        // }),

        this.empContactDetailsForm.patchValue({
          workemail: this.singleEmpData.contactdetails[0]?.workemail,
          personalemail: this.singleEmpData.contactdetails[0]?.personalemail,
          mobile: this.singleEmpData.contactdetails[0]?.mobile,
          workphone: this.singleEmpData.contactdetails[0]?.workphone,
          residencephone: this.singleEmpData.contactdetails[0]?.residencephone
        }),
        this.empAddressDetailsForm.patchValue({
          presentaddress: this.singleEmpData.addressdetails[0]?.presentaddress,
          presentaddresspin: this.singleEmpData.addressdetails[0]?.presentaddresspin,
          permanentaddress: this.singleEmpData.addressdetails[0]?.permanentaddress,
          permanentaddresspin: this.singleEmpData.addressdetails[0]?.permanentaddresspin,
        }),

        // this.empExperianceDetailsForm.setValue({
        //   designation:'',
        //   reportingto: '',
        //   fromto:'',
        //   mainwork:'',
        //   organizationname: '',
        //   expinyears: '',
        //   salary: ''
        // }),

        this.ProfessionalsummaryForm.patchValue({
          langspeak: this.singleEmpData.professionalsummary[0]?.langspeak,
          langread: this.singleEmpData.professionalsummary[0]?.langread,
          strenths: this.singleEmpData.professionalsummary[0]?.strenths,
          weakness: this.singleEmpData.professionalsummary[0]?.weakness,
          professionalsummary: this.singleEmpData.professionalsummary[0]?.professionalsummary
        }),
        this.documentsForm.setValue({
          aadhar: '',
          pan: '',
          experience: '',
          educationdetails: '',
          bankstatement: ''
        }),
        this.empBankForm.patchValue({
          accountno: this.singleEmpData.bankdetails[0]?.accountno,
          accountantname: this.singleEmpData.bankdetails[0]?.accountantname,
          bankname: this.singleEmpData.bankdetails[0]?.bankname,
          branch: this.singleEmpData.bankdetails[0]?.branch,
          ifscno: this.singleEmpData.bankdetails[0]?.ifscno,
        })





    })
  }
  editRelationData(data: any) {
    console.log(data);
    this.wantUpdate = true;
    this.empRelationsDetailsForm.setValue({
      relationid: data._id,
      relationtype: data.relationtype,
      fullname: data.fullname,
      mobile: data.mobile,
      address: data.address,
    })
  }
  resetMyRelFrm() {
    this.empRelationsDetailsForm.reset();
    this.wantUpdate = false;
  }
  resetMyEduFrm() {
    this.empEducationDetailsForm.reset();
    this.wantUpdate = false;
  }
  editEducationalData(data: any) {
    this.wantUpdate = true;
    this.empEducationDetailsForm.setValue({
      educationid: data._id,
      type: data.type,
      institutename: data.institutename,
      yearpassed: data.yearpassed,
      group: data.group,
      grade: data.grade
    })

  }
  editLeavesData(data: any) {
    this.empAddLeavesForm.patchValue({
      annualleaves: data.annualleaves,
      leavetype: data.leavetype,
      consumed: data.consumed
    })
  }
  editEmpexp(data: any) {
    this.wantUpdate = true;
    this.empExperianceDetailsForm.patchValue({
      experienceid: data._id,
      designation: data.designation,
      reportingto: data.reportingto,
      fromto: data.fromto,
      mainwork: data.mainwork,
      organizationname: data.organizationname,
      expinyears: data.expinyears,
      salary: data.salary
    })
  }


  primaryFormSubmit() {
    this.submitted1 = true;
    const id = this.empID;
    const dateofbirthFormat: any = new DatePipe('en-US').transform(this.empPrimaryDetailsForm.value.dateofbirth, 'dd/MM/yyyy')
    const primaryFormData: any = {
      firstname: this.empPrimaryDetailsForm.value.firstname,
      lastname: this.empPrimaryDetailsForm.value.lastname,
      displayname: this.empPrimaryDetailsForm.value.displayname,
      gender: this.empPrimaryDetailsForm.value.gender,
      dateofbirth: dateofbirthFormat,
      maritalstatus: this.empPrimaryDetailsForm.value.maritalstatus,
      bloodgroup: this.empPrimaryDetailsForm.value.bloodgroup,
      physicallyhandicapped: this.empPrimaryDetailsForm.value.physicallyhandicapped

    }
    const data: any = {
      primarydetails:
        [primaryFormData]
    }
    if (this.empPrimaryDetailsForm.valid) {
      this.empService.empPrimaryUpdateApi(id, data).subscribe((res: any) => {
        console.log('primary res', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });

      }, (err) => {
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }
  }
  contactFormSubmit() {
    this.submitted2 = true;
    const id = this.empID;
    const data: any = {
      contactdetails:
        [this.empContactDetailsForm.value]
    }
    if (this.empContactDetailsForm.valid) {
      this.empService.empContactUpdateApi(id, data).subscribe((res: any) => {
        console.log('contact res', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      }, (err) => {
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }
  }
  addressFormSubmit() {
    this.submitted3 = true;
    const id = this.empID;
    if (this.empAddressDetailsForm.valid) {
      const data: any = {
        addressdetails:
          [this.empAddressDetailsForm.value]
      }
      console.log(data)
      this.empService.empAddressUpdateApi(id, data).subscribe((res: any) => {
        console.log('address res', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      }, (err) => {
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }
  }
  relationsFormSubmit() {
    this.submitted4 = true;
    const id = this.empID;
    let relFrmData = this.empRelationsDetailsForm.value;
    if (relFrmData.relationid) {
      this.empService.updateRelation(id, relFrmData).subscribe((res: any) => {
        
        this.toast.success({ detail: "SUCCESS", summary: 'Data updated successfully..!' });
        console.log('updated rel', res);
        this.getEmpDetails();
      })
    }
    else {

      if (this.empRelationsDetailsForm.valid) {
        const data: any = {
          relationdetails:
            [this.empRelationsDetailsForm.value]
        }
        this.empService.empRealationsUpdateApi(id, data).subscribe((res: any) => {
          console.log('relation res', res);
         
          this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
          this.submitted4 = false;
          this.getEmpDetails();
          this.empRelationsDetailsForm.reset();
        }, (err) => {
          this.toast.error({ detail: "Oops..!", summary: err.error.message });
        })
      }
    }

  }
  experianceFormSubmit() {
    this.submitted5 = true;
    const id = this.empID;
    let experienceData = this.empExperianceDetailsForm.value;
    console.log(experienceData);
    if (experienceData.experienceid) {
      this.empService.updateExperience(id, experienceData).subscribe((res: any) => {
        console.log('updated Experience', res)
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data Updated successfully..!' });
        this.empExperianceDetailsForm.reset();
        this.submitted5 = false;
      })
    }
    else {
      const data: any = {
        workexperience:
          [this.empExperianceDetailsForm.value]
      }
      if (this.empExperianceDetailsForm.valid) {
        this.empService.empExperianceUpdateApi(id, data).subscribe((res: any) => {
          console.log('relation res', res);
          this.getEmpDetails();
          this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
          this.empExperianceDetailsForm.reset();
          this.submitted5 = false;
        }, (err) => {
          this.toast.error({ detail: "Oops..!", summary: err.error.message });
        })
      }
    }

  }
  resetMyExperiFrm() {
    this.empExperianceDetailsForm.reset();
    this.wantUpdate = false;
  }
  educationFormSubmit() {
    this.submitted6 = true;
    const id = this.empID;
    let eduFrmData = this.empEducationDetailsForm.value;
    if (eduFrmData.educationid) {
      this.empService.updateEducation(id, eduFrmData).subscribe((res: any) => {
        console.log('updated educational details', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data Updated successfully..!' });
        this.empEducationDetailsForm.reset();
        this.submitted6 = false;
      })

    }
    else {
      const data: any = {
        educationdetails:
          [this.empEducationDetailsForm.value]
      }
      if (this.empEducationDetailsForm.valid) {
        this.empService.empEducationUpdateApi(id, data).subscribe((res: any) => {
          console.log('relation res', res);
          this.getEmpDetails();
          this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
          this.empEducationDetailsForm.reset();
          this.submitted6 = false;
        }, (err) => {
          this.toast.error({ detail: "Oops..!", summary: err.error.message });
        })
      }
    }

  }
  professionalFormSubmit() {
    this.submitted7 = true;
    const id = this.empID;
    const data: any = {
      professionalsummary:
        [this.ProfessionalsummaryForm.value]
    }
    if (this.ProfessionalsummaryForm.valid) {
      this.empService.empSummeryUpdateApi(id, data).subscribe((res: any) => {
        console.log('emp summary res', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      }, (err) => {
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }
  }
  documentsFormSubmit() {
    this.submitted8 = true;
  }
  bankFormSubmit() {
    this.submitted9 = true;
    const id = this.empID;
    const data: any = {
      bankdetails:
        [this.empBankForm.value]
    }
    if (this.empBankForm.valid) {
      this.empService.empUpdateBankApi(id, data).subscribe((res: any) => {
        console.log('relation res', res);
        this.getEmpDetails();
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
      }, (err) => {
        this.toast.error({ detail: "Oops..!", summary: err.error.message });
      })
    }

  }
  empAddLeaves() {
    this.submitted10 = true;
    const data: any =
    {
      employee_id: this.empID,
      annualleaves: this.empAddLeavesForm.value.annualleaves,
      leavetype: this.empAddLeavesForm.value.leavetype,
      consumed: this.empAddLeavesForm.value.consumed
    }
    this.empService.empLeavesUpdateApi(data).subscribe((res: any) => {
      console.log('relation res', res);
      this.getEmpLeaves();
      this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
    }, (err) => {
      this.toast.error({ detail: "Oops..!", summary: err.error.message });
    })
  }


  deleteEmpEducation(objId: any) {
    const id = this.empID;
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.empService.deleteEmpEducation(id, { _id: objId }).subscribe((res: any) => {
            console.log('edu Delete', res);
            this.getEmpDetails();
            this.toast.success({ detail: "SUCCESS", summary: res.message });
          }, (err) => {
            this.toast.error({ detail: "Oops..!", summary: err.error.message });
          });
        }
      });

  }
  deleteEmpExp(objId: any) {
    const id = this.empID;
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.empService.deleteEmpworkExp(id, { _id: objId }).subscribe((res: any) => {
            console.log('exp Delete', res);
            this.getEmpDetails();
            this.toast.success({ detail: "SUCCESS", summary: res.message });
          }, (err) => {
            this.toast.error({ detail: "Oops..!", summary: err.error.message });
          });
        }
      });
  }
  deleteEmpRelation(objId: any) {
    const id = this.empID;
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.empService.deleteEmpRelation(id, { _id: objId }).subscribe((res: any) => {
            console.log('exp Delete', res);
            this.getEmpDetails();
            this.toast.success({ detail: "SUCCESS", summary: res.message });
          }, (err) => {
            this.toast.error({ detail: "Oops..!", summary: err.error.message });
          });
        }
      });
  }
  deleteEmpLeave(objId: any) {
    const id = this.empID;
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.empService.deleteEmpLeave(id, { _id: objId }).subscribe((res: any) => {
            console.log('exp Delete', res);
            this.getEmpDetails();
            this.toast.success({ detail: "SUCCESS", summary: res.message });
          }, (err) => {
            this.toast.error({ detail: "Oops..!", summary: err.error.message });
          });
        }
      });
  }
}
