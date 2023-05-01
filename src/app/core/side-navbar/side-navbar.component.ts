import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavService } from 'src/app/shared/services/side-nav.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({height: 0})),
      state('down', style({height: '*'})),
      transition('up <=> down', animate(200)),
    ])
  ]
})
export class SideNavbarComponent {
  menus:any;

roleId!: any;
orgMenus = [];
// orgType: number;
remove: boolean = true;

  constructor(private sideNavService:SideNavService,private router:Router) { 
    this.menus = this.sideNavService.getMenus();
  }
  // toggle nav

  togglea() {
    if (this.remove == false) {
      this.remove = true;
    } else {
      this.remove = false;
    }
  }

// end
  getSideBarState() {
    return this.sideNavService.getSidebarState();
  }
  ngOnInit(): any {
    const auth:any = localStorage.getItem('auth');
    const authRole:any=JSON.parse(auth);
    console.log('app role',authRole.admin.role)
    const checkRoleID =authRole.admin.role;
    if(checkRoleID == 3){
      this.router.navigate(['/mrf/managerResourceRequisitionForm']);
      return this.roleId = 3
      
    }else if(checkRoleID == 1){
      return this.roleId = 0;
    }else if(checkRoleID ==2){
      return this.roleId=0;
    }

  }
  toggle(currentMenu:any) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach((element: { active: boolean; }) => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }
  getState(currentMenu:any) {
    if(currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  } 

}
