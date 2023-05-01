import { Component } from '@angular/core';
import { AnnouncementService } from 'src/app/shared/services/announcement.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { NgToastService } from 'ng-angular-popup';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-announcements-list',
  templateUrl: './announcements-list.component.html',
  styleUrls: ['./announcements-list.component.scss']
})
export class AnnouncementsListComponent {
  announcementData:any;
  page = 4;
  pageSize=10;
  q:any;
  noData:boolean=false;
  addVisible:boolean=false;
  addAnnouncementForm!:FormGroup;
  submitted = false;
  clickedID:any;
  updateAnnouncementForm!:FormGroup;

  constructor (private formBuilder: FormBuilder,private api:AnnouncementService, private confirmBoxEvokeService: ConfirmBoxEvokeService, private toast: NgToastService){
    this.announcementList();
    this.addAnnouncementForm= this.formBuilder.group({
      title: new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
      });
    this.updateAnnouncementForm = this.formBuilder.group({
      title: new FormControl('',[Validators.required]),
      description:new FormControl('',[Validators.required]),
    })
  }
  
  ngOnInit(){
    this.announcementList();
    // setInterval(()=>{
      
    // },1500)
  }

  announcementList(){
    this.api.getAnnouncement().subscribe(res=>{
      this.announcementData=res;
      if(this.announcementData.length <=0){
        this.noData=true;
      }
      console.log(this.announcementData)
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.addAnnouncementForm.controls;
  }
  get f1(): { [key: string]: AbstractControl } {
    return this.updateAnnouncementForm.controls;
  }
  editAnnouncement(id:any){
    this.clickedID = id;
    this.api.getsingledataAnnouncement(id).subscribe(res=>{
      res;
      this.updateAnnouncementForm.setValue({
        title:res.title,
        description:res.description
      })
    })
  }
  addOnSubmit(): void {
    this.submitted = true;
    if (this.addAnnouncementForm.valid) {
      this.api.postAnnouncement(this.addAnnouncementForm.value).subscribe(res=>{
        console.log(res)
        this.toast.success({ detail: "SUCCESS", summary: 'Data submitted successfully..!' });
        //this.updateAnnouncementForm.reset();
        this.submitted = false;
        this.addVisible =false;
        this.announcementList();
        //this.route.navigate(['announcement/announcements-list'])
      },
      (err)=>{
        this.toast.error({ detail: "Oops..!", summary: 'Somethng went wrong..!' });
      })
    }
  }
  updateOnSubmit(key:any){
    this.submitted = true;
    // alert(JSON.stringify(this.updateAnnouncementForm.value));
    if (this.updateAnnouncementForm.valid && key.keyCode == 13) {
      this.api.updateEnnouncement(this.clickedID,this.updateAnnouncementForm.value).subscribe(res=>{
        this.showSuccess();
        this.clickedID = '';
        this.announcementList();
        //this.updateAnnouncementForm.reset()
        //this.route.navigate(['announcement/announcements-list'])
      },
      err=>{
        this. showerror();
      })
    }
  }
  removeEdit(id:any){
    if(this.clickedID!==id)
    this.clickedID = '';
  }

  deleteAnnouncementData(id: any) {
    this.confirmBoxEvokeService.danger('Delete...?', 'Are you sure...?', 'Confirm', 'Decline')
      .subscribe(resp => {
        console.log('resp', resp)
        if (resp.success == true) {
          this.api.deleteAnnouncement(id).subscribe(res => {
            console.log(res); 
            this.toast.success({ detail: "SUCCESS", summary: 'Data deleted successful..!' });

            this.announcementList();
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
  
}
