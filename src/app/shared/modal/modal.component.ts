import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HiringService } from '../services/hiring.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() public mData:any;
  noteForm!:FormGroup;
  submitted=false;
  constructor(public activeModal: NgbActiveModal,private formBuilder:FormBuilder,private hiringService:HiringService) { 
    console.log('Modal data',this.mData);
    this.noteForm=this.formBuilder.group({
      note:new FormControl('',[Validators.required])
    })
  }
  ngOnInit(){
    console.log('Modal data',this.mData);

  }
  get f(): { [key: string]: AbstractControl } {
    return this.noteForm.controls;
    
  }
  popupSubmit(){
    this.onSubmit();
  }

  onSubmit(){
    this.submitted=true;
    const note:any=this.noteForm.value.note;
    console.log('123456',this.noteForm.value);

    this.hiringService.jobStatus({applicationid:this.mData.id,status:this.mData.value,note:note}).subscribe((res:any)=>{
      console.log(res);
      this.activeModal.close();
    })
  }
}
