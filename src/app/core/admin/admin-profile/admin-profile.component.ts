import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OpenPositionsComponent } from '../open-positions/open-positions.component';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  @Input() public profileData:any;
  admin:any;



  constructor(private modalService: NgbModal){
    var auth:any = localStorage.getItem("auth");
    this.admin =JSON.parse(auth);
    console.log(this.admin.admin);
  }
  
  openSheet(){
    const data:any ={
     name:"open postions Data"
    }
    const modalRef = this.modalService.open(OpenPositionsComponent,data);
    modalRef.componentInstance.data = data;
  }

}
