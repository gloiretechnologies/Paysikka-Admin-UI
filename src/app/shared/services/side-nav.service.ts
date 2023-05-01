import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  
  toggled: any;
  public toggle$: Subject<any> = new Subject;
  constructor() { }

  isToggle(data: any) {
    this.toggle$.next(data);
  }

  menus = [
    {
      title: 'Dashboard',
      icon: 'fa-solid fa-chart-column',
      active: false,
      type: 'simple',
      routerLink: 'dashboard',
      routerOptions: {},
      role: 0,
    },
    {
      title: 'Hiring',
      icon: 'fa-sharp fa-solid fa-clipboard-check',
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'List Of Jobs',
          icon: 'fa-solid fa-list',
          active: false,
          type: 'simple',
          routerLink: '/hiring/list-of-jobs',
          routerOptions: {},
          role:0
        },
        {
          title: 'Add Job',
          icon: 'fa-solid fa-address-card',
          active: false,
          type: 'simple',
          routerLink: '/hiring/jobpost',
          routerOptions: {},
          role:0
        },
        {
          title: 'List Of Applicants',
          icon: 'fa-solid fa-users',
          active: false,
          type: 'simple',
          routerLink: '/hiring/list-of-applicants',
          routerOptions: {},
          role:0
        },
        // {
        //   title: 'Add Applicant',
        //   icon: 'fa-solid fa-users',
        //   active: false,
        //   type: 'simple',
        //   routerLink: '/hiring/add-applicant',
        //   routerOptions: {},
        //   role:0
        // },
      ]
    },
    {
      title: 'Employees',
      icon: 'fa-solid fa-user-tie',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'Employees List',
          icon: 'fa-solid fa-list',
          active: false,
          type: 'simple',
          routerLink: '/employees/list-of-employees',
          routerOptions: {},
          role:0
        },
        {
          title: 'Add Employee',
          icon: 'fa-solid fa-person-circle-plus',
          active: false,
          type: 'simple',
          routerLink: '/employees/add-employee',
          routerOptions: {},
          role:0
        },
        // {
        //   title: 'Update Employee',
        //   icon: 'fa-solid fa-user-tie',
        //   active: false,
        //   type: 'simple',
        //   routerLink: '/employees/update-employee-details',
        //   routerOptions: {},
        //   role:0
        // },
        
        
      ]
    },
    {
      title: 'Attendance',
      icon: 'fa-solid fa-calendar-days',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'Attendance-logs',
          icon: 'fa-solid fa-clipboard-list',
          active: false,
          type: 'simple',
          routerLink: '/attendance/attendance-logs',
          routerOptions: {},
          role:0
        },
        // {
        //   title: 'Regularize Req',
        //   icon: 'fa-solid fa-address-card',
        //   active: false,
        //   type: 'simple',
        //   routerLink: '/attendance/regularize-req',
        //   routerOptions: {},
        //   role:0
        // },
        {
          title: 'Comp-off Requests',
          icon: 'fa-solid fa-hand-holding-hand',
          active: false,
          type: 'simple',
          routerLink: '/attendance/comp-off-request',
          routerOptions: {},
          role:0
        },
        {
          title: 'Leaves',
          icon: 'fa-solid fa-swatchbook',
          active: false,
          type: 'simple',
          routerLink: '/attendance/leaves',
          routerOptions: {},
          role:0
        },
       
      
      ]
    },

    
    {
      title: 'holidays',
      icon: 'fa-solid fa-mug-hot',
      active: false,
      type: 'simple',
      routerLink: '/holidays/holidays-list',
      routerOptions: {},
      role: 0,
      // submenus: [
      //   {
      //     title: 'Holidays list',
      //     icon: 'fa-solid fa-list',
      //     active: false,
      //     type: 'simple',
      //     routerLink: '/holidays/holidays-list',
      //     routerOptions: {},
      //     role:0
      //   },
      //   {
      //     title: 'Add holiday',
      //     icon: 'fa-solid fa-circle-plus',
      //     active: false,
      //     type: 'simple',
      //     routerLink: '/holidays/add-holiday',
      //     routerOptions: {},
      //     role:0
      //   },
        
       
        
      // ]

      

    },
    {
      title: 'Announcements',
      icon: 'fa-solid fa-bullhorn',
      active: false,
      type: 'simple',
      routerLink: '/announcement/announcements-list',
      routerOptions: {},
      role: 0,
      // submenus: [
      //   {
      //     title: 'announcements list',
      //     icon: 'fa-solid fa-list',
      //     active: false,
      //     type: 'simple',
      //     routerLink: '/announcement/announcements-list',
      //     routerOptions: {},
      //     role:0
      //   },
      //   {
      //     title: 'add-announcement ',
      //     icon: 'fa-solid fa-circle-plus',
      //     active: false,
      //     type: 'simple',
      //     routerLink: '/announcement/add-announcements',
      //     routerOptions: {},
      //     role:0
      //   },  
      // ]
    },
    {
      title: 'MRF',
      icon: 'fa-solid fa-list-check',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'Resource Requisition',
          icon: 'fa-solid fa-list',
          active: false,
          type: 'simple',
          routerLink: '/mrf/hrResourceRequisitionForm',
          routerOptions: {},
          role:0
        }
      ]
    },
    {
      title: 'MRF',
      icon: 'fa-solid fa-bullhorn',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 3,
      submenus: [
        {
          title: 'Resource Requisition Form',
          icon: 'fa-solid fa-circle-plus',
          active: false,
          type: 'simple',
          routerLink: '/mrf/managerResourceRequisitionForm',
          routerOptions: {},
          role:3
        },  
      ]
    },
    {
      title: 'settings',
      icon: 'fa-solid fa-gear',
      active: false,
      type: 'dropdown',
      routerLink: '',
      routerOptions: {},
      role: 0,
      submenus: [
        {
          title: 'departments',
          icon: 'fa-solid fa-building-user',
          active: false,
          type: 'simple',
          routerLink: '/settings/departments',
          routerOptions: {},
          role:0
        },
        {
          title: 'designations',
          icon: 'fa-solid fa-id-card-clip',
          active: false,
          type: 'simple',
          routerLink: '/settings/designations',
          routerOptions: {},
          role:0
        },  
        {
          title: 'admin',
          icon: 'fa-solid fa-shield-halved',
          active: false,
          type: 'simple',
          routerLink: '/settings/admin',
          routerOptions: {},
          role:0
        },  
      ]

      

    },

  ]

  getMenus() {
    return this.menus;
  }
  toggle() {
    this.toggled = !this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }
}
