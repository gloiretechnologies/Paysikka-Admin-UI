import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HiringService } from 'src/app/shared/services/hiring.service';

@Component({
  selector: 'app-add-applicant',
  templateUrl: './add-applicant.component.html',
  styleUrls: ['./add-applicant.component.scss']
})
export class AddApplicantComponent {

  addApplicantForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private hiringService: HiringService) { }

  ngOnInit() {
    this.addApplicantForm = this.formBuilder.group({
      fullname: new FormControl ('', Validators.required),
      primarycontact: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      alternatecontact: new FormControl ('', [Validators.pattern('^[0-9]{10}$')]),
      typeofconveyance: new FormControl(''),
      anysuggestions: new FormControl(''),
      particularthingobserved: new FormControl(''),
      knowourcompany: new FormControl(''),
      jobrole: new FormControl(''),
      totalworp: new FormControl(''),
      from: new FormControl(''),
      resume: new FormControl(''),

      //presentemoluments
      basicsalary: new FormControl(''),
      benefitsandperks: new FormControl(''),
      netemoluments: new FormControl(''),
      grossemoluments: new FormControl(''),

      //workexperience
        organizationname: new FormControl(''),
        designation: new FormControl(''),
        expinyears: new FormControl(''),
        salary: new FormControl(''),
        reportingto: new FormControl(''),
        mainWork: new FormControl(''),
        fromTo: new FormControl(''),

        organizationname1: new FormControl(''),
        designation1: new FormControl(''),
        expinyears1: new FormControl(''),
        salary1: new FormControl(''),
        reportingto1: new FormControl(''),
        mainWork1: new FormControl(''),
        fromTo1: new FormControl(''),

        organizationname2: new FormControl(''),
        designation2: new FormControl(''),
        expinyears2: new FormControl(''),
        salary2: new FormControl(''),
        reportingto2: new FormControl(''),
        mainWork2: new FormControl(''),
        fromTo2: new FormControl(''),

        organizationname3: new FormControl(''),
        designation3: new FormControl(''),
        expinyears3: new FormControl(''),
        salary3: new FormControl(''),
        reportingto3: new FormControl(''),
        mainWork3: new FormControl(''),
        fromTo3: new FormControl(''),

        organizationname4: new FormControl(''),
        designation4: new FormControl(''),
        expinyears4: new FormControl(''),
        salary4: new FormControl(''),
        reportingto4: new FormControl(''),
        mainWork4: new FormControl(''),
        fromTo4: new FormControl(''),

      //personaldetails

        fatherorhusbandname: new FormControl(''),
        dateOfbirth: new FormControl(''),
        presentaddress: new FormControl(''),
        pin1: new FormControl(''),
        permanentaddress: new FormControl(''),
        pin2: new FormControl(''),
        guardiancontactnumber: new FormControl ('', [Validators.pattern('^[0-9]{10}$')]),
        aadharno: new FormControl ('', Validators.pattern('^[0-9]{12}$')),
        panno: new FormControl ('', Validators.pattern('^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$')),
        maritalStatus: new FormControl(''),
        languagesread: new FormControl(''),
        languagespeak: new FormControl(''),
        email: new FormControl ('', [Validators.required, Validators.email]),
        altemail: new FormControl ('', Validators.email),
        strength: new FormControl(''),
        weakness: new FormControl(''),

      //educationalqualification
        schoolname:new FormControl(''),
        schoolgroup: new FormControl(''),
        schoolyearpassed:new FormControl(''),
        schoolgrade:new FormControl(''),

        intermediatename:new FormControl(''),
        intergroup:new FormControl(''),
        interyearpassed:new FormControl(''),
        intergrade:new FormControl(''),

        graduationname:new FormControl(''),
        graduationgroup:new FormControl(''),
        graduationyearpassed:new FormControl(''),
        graduationgrade:new FormControl(''),

        pgname:new FormControl(''),
        pggroup:new FormControl(''),
        pgyearpassed:new FormControl(''),
        pggrade:new FormControl(''),



        institutename: new FormControl(''),
        group: new FormControl(''),
        yearpassed: new FormControl(''),
        grade: new FormControl(''),
        educationtype: new FormControl(''),

      //reference
        name: new FormControl(''),
        ref_designation: new FormControl(''),
        companyname: new FormControl(''),
        address: new FormControl(''),
        contactnumber: new FormControl ('', [Validators.pattern('^[0-9]{10}$')]),
       
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addApplicantForm.controls;
  }

  selectedfile:any;
  imageSrc:any;

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
  submit(){
    this.submitted = true;
    const data:any={
      fullname: this.addApplicantForm.value.fullname,
      primarycontact: this.addApplicantForm.value.primarycontact,
      alternatecontact: this.addApplicantForm.value.alternatecontact,
      typeofconveyance: this.addApplicantForm.value.typeofconveyance,
      anysuggestions: this.addApplicantForm.value.anysuggestions,
      particularthingobserved: this.addApplicantForm.value.particularthingobserved,
      knowourcompany: this.addApplicantForm.value.knowourcompany,
      jobrole: this.addApplicantForm.value.jobrole,
      totalworp: this.addApplicantForm.value.totalworp,
      from: this.addApplicantForm.value.from,
      resume: this.selectedfile,
      presentemoluments:[
        {
          basicsalary: this.addApplicantForm.value.basicsalary,
          benefitsandperks: this.addApplicantForm.value.benefitsandperks,
          netemoluments: this.addApplicantForm.value.netemoluments,
          grossemoluments: this.addApplicantForm.value.grossemoluments,
          typeofconveyance:this.addApplicantForm.value.typeofconveyance
        }
      ],
      workexperience:[
        {
          organizationname:this.addApplicantForm.value.organizationname,
          designation:this.addApplicantForm.value.designation,
          expinyears: this.addApplicantForm.value.expinyears,
          salary: this.addApplicantForm.value.salary,
          reportingto: this.addApplicantForm.value.reportingto,
          mainWork: this.addApplicantForm.value.mainWork,
          fromTo:this.addApplicantForm.value.fromTo,
        },
        // {
        //   organizationname:this.addApplicantForm.value.organizationname1,
        //   designation:this.addApplicantForm.value.designation1,
        //   expinyears: this.addApplicantForm.value.expinyears1,
        //   salary: this.addApplicantForm.value.salary1,
        //   reportingto: this.addApplicantForm.value.reportingto1,
        //   mainWork: this.addApplicantForm.value.mainWork1,
        //   fromTo:this.addApplicantForm.value.fromTo1,
        // },
        // {
        //   organizationname:this.addApplicantForm.value.organizationname2,
        //   designation:this.addApplicantForm.value.designation2,
        //   expinyears: this.addApplicantForm.value.expinyears2,
        //   salary: this.addApplicantForm.value.salary2,
        //   reportingto: this.addApplicantForm.value.reportingto2,
        //   mainWork: this.addApplicantForm.value.mainWork2,
        //   fromTo:this.addApplicantForm.value.fromTo2,
        // },
        // {
        //   organizationname:this.addApplicantForm.value.organizationname3,
        //   designation:this.addApplicantForm.value.designation3,
        //   expinyears: this.addApplicantForm.value.expinyears3,
        //   salary: this.addApplicantForm.value.salary3,
        //   reportingto: this.addApplicantForm.value.reportingto3,
        //   mainWork: this.addApplicantForm.value.mainWork3,
        //   fromTo:this.addApplicantForm.value.fromTo3,
        // },
        // {
        //   organizationname:this.addApplicantForm.value.organizationname4,
        //   designation:this.addApplicantForm.value.designation4,
        //   expinyears: this.addApplicantForm.value.expinyears4,
        //   salary: this.addApplicantForm.value.salary4,
        //   reportingto: this.addApplicantForm.value.reportingto4,
        //   mainWork: this.addApplicantForm.value.mainWork4,
        //   fromTo:this.addApplicantForm.value.fromTo4,
        // }
      ],
      personaldetails:[ 
        {
          fatherorhusbandname: this.addApplicantForm.value.fatherorhusbandname,
          dateOfbirth: this.addApplicantForm.value.dateOfbirth,
          presentaddress: this.addApplicantForm.value.presentaddress,
          pin1: this.addApplicantForm.value.pin1,
          permanentaddress: this.addApplicantForm.value.permanentaddress,
          pin2: this.addApplicantForm.value.pin2,
          guardiancontactnumber: this.addApplicantForm.value.guardiancontactnumber,
          aadharno: this.addApplicantForm.value.aadharno,
          panno: this.addApplicantForm.value.panno,
          maritalStatus: this.addApplicantForm.value.maritalStatus,
          languagesread: this.addApplicantForm.value.languagesread,
          languagespeak: this.addApplicantForm.value.languagespeak,
          email: this.addApplicantForm.value.email,
          altemail: this.addApplicantForm.value.altemail,
          strength: this.addApplicantForm.value.strength,
          weakness: this.addApplicantForm.value.weakness,
        }
      ],
      educationalqualification:[
        {
          educationtype: "school",
          institutename: this.addApplicantForm.value.schoolname, 
          group: this.addApplicantForm.value.schoolgroup,
          yearpassed: this.addApplicantForm.value.schoolyearpassed,
          grade: this.addApplicantForm.value.schoolgrade,
        },
        // {
        //   educationtype: "Intermediate/diploma",
        //   institutename: this.addApplicantForm.value.intermediatename,
        //   group: this.addApplicantForm.value.intergroup,
        //   yearpassed: this.addApplicantForm.value.interyearpassed,
        //   grade: this.addApplicantForm.value.intergrade,
        // },
        // {
        //   educationtype: "Gradution",
        //   institutename: this.addApplicantForm.value.graduationname,
        //   group: this.addApplicantForm.value.graduationgroup,
        //   yearpassed: this.addApplicantForm.value.graduationyearpassed,
        //   grade: this.addApplicantForm.value.graduationgrade,
        // },
        // {
        //   educationtype: "PG",
        //   institutename: this.addApplicantForm.value.pgname,
        //   group: this.addApplicantForm.value.pggroup,
        //   yearpassed: this.addApplicantForm.value.pgyearpassed,
        //   grade: this.addApplicantForm.value.pggrade,
        // },
        // {
        //   educationtype: "Further Details",
        //   institutename: this.addApplicantForm.value.institutename,
        //   group: this.addApplicantForm.value.group,
        //   yearpassed: this.addApplicantForm.value.yearpassed,
        //   grade: this.addApplicantForm.value.grade,
        // }
      ],
      reference:[
        {
        name: this.addApplicantForm.value.name,
        designation: this.addApplicantForm.value.ref_designation,
        companyname: this.addApplicantForm.value.companyname,
        address: this.addApplicantForm.value.address,
        contactnumber: this.addApplicantForm.value.contactnumber,
        }
      ]
    }


    const dummydata:any={
      fullname: 'madhu babu',
      primarycontact: 9948333534,
      alternatecontact: 9948555256,
      typeofconveyance: 'metro',
      anysuggestions: 'sdfsfsdf',
      particularthingobserved: 'sfsdfsdfsfd',
      knowourcompany: 'sdfsfsdfsd',
      jobrole: 'Angular Developer',
      totalworp: 5,
      from: 'sdfsdffd',
      resume: 'sdffsfsdf',
      priority:'high',
      presentemoluments:[
        {
          basicsalary: 5000,
          benefitsandperks: 'sdfsffsdf',
          netemoluments: "50000",
          grossemoluments: "50000",
        }
      ],
      workexperience:[
        {
          organizationname:'school',
          designation:'sdfsfsdfsdf',
          expinyears: 5,
          salary: 45455454,
          reportingto: 'sdfsmlkmlmsd',
          mainWork: 'kkksnfnkjnjsnd',
          fromTo:'sfsnkjnjksd',
        }
      ],
      personaldetails:[
        {
          fatherorhusbandname: 'sfsfsfsfsfsfsd',
          dateOfbirth: '12/02/2015',
          presentaddress: 'sdfsffssdf',
          pin1: 5645,
          permanentaddress: 'sdfdsdfsdfsd',
          pin2: 54454,
          guardiancontactnumber: 9948333564,
          aadharno: 458596587952,
          panno: 'DSAPP5429R',
          maritalStatus: 'sdfsdfsd',
          languagesread: 'sdfsdfsd',
          languagespeak: 'sdfsfs',
          email: 'sdfsdfs@gmail.com',
          altemail: 'sffsdf@gmail.com',
          strength: 'fdsfsaf',
          weakness:'safadad',
        }
      ],
      educationalqualification:[
        {
          educationtype: "school",
          institutename:'fsfafds', 
          group: 'fsfdsadfsdf',
          yearpassed: 2017,
          grade: 'sdfaasd',
        }
      ],
      reference:[
        {
        name: 'sfsfsd',
        designation: 'fsdfsfsfsfsdfsdfs',
        companyname: 'sdfdsfsdfsd',
        address: 'sdfsdfsdf',
        contactnumber: 9948666358,
        }
      ]
    }

    const testdata:any={
      "fullname":"urvasi routela",
      "priority": "high",
      "primarycontact":9948333659,
      "alternatecontact":9948555789,
      "presentemoluments":[{
          "basicsalary":100000,
          "benefitsandperks":"hfdhsdfd",
          "netemoluments":"fgsufbfb",
          "grossemoluments":"fhhfhbgbhghg"
      }],
      "workexperience":[{
          "fromto": "22 april - dec 2023",
          "organiztionnanme": "abc",
          "desination": "node.js developer",
          "expinyears": 2,
          "salary": 3,
          "reportingto": "sai",
          "mainwork": "project"
      }],
      "personaldetails":[{
          "fatherorhusbandname":"abc",
          "dateofbirth":"22/12/1945",
          "presentaddress":"hsdfjgfjdsgf",
          "pin1": 500124,
          "permanentaddress":"jdsfkhjdhsbvbd",
          "pin2":500187,
          "gardiancontactnumber":78945613230,
          "aadharno": 123456981254,
          "panno": "4GDTYSB514",
          "maritalstatus":"Unmarried",
          "languagesread": "telugu,hindi",
          "languagespeak":"telugu, english",
          "email":"soumya@gmail.com",
          "altemail":  "sangoji@gmail.com",
          "strength":"sfdaghvd",
          "weakness":"fbasjdgvjbsabznv"
      }],
      "educationalqualification": [{
          "institutename":"hjdfsgjdvn",
          "group":"dfashjcdsnbcb",
          "yearpassed":2019,
          "grade":"bshd",
          "educationtype":"school"
      }],
      "reference":[{
          "name":"soumya",
          "designation":"backend developer",
          "companyname":"sajdfgfdbh",
          "address":"sdhbjCdnbsc",
          "contactnumber":7095614864
      }],
      "typeofconveyance":"dchjsgjdf",
      "anysuggestions":"nfsgbfjdsh",
      "particularthingobserved":"shDCBVSABNBC",
      "knowourcompany":"DAHYFH",
      "jobrole": "Node.Js Developer",
      "totalworkexp": "5 yrs",
      "from": 7
      }

      // const data12:any = new FormData();
      // data12.append('mydata',testdata);
      // data12.append('resume',this.selectedfile);    
    this.hiringService.applyJobApi({mydata:testdata,resume:this.selectedfile}).subscribe((res:any)=>{
      console.log(res);
    })
    console.log('add form',this.addApplicantForm.value)
    console.log('my data',data);
    if(this.addApplicantForm.valid){
     
    }
  }


}


