import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantsListComponent } from './core/hiring/applicants-list/applicants-list.component';
import { EditJobPostComponent } from './core/hiring/edit-job-post/edit-job-post.component';
import { HiringMainComponent } from './core/hiring/hiring-main/hiring-main.component';
import { JobPostComponent } from './core/hiring/job-post/job-post.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './shared/services/auth.guard';
import { EmployeesListComponent } from './core/employees/employees-list/employees-list.component';
import { AddEmployeeComponent } from './core/employees/add-employee/add-employee.component';
import { UpdateEmployeeDetailsComponent } from './core/employees/update-employee-details/update-employee-details.component';
import { ListOfOrganizationComponent } from './core/organizations/list-of-organization/list-of-organization.component';
import { AddOrganizationComponent } from './core/organizations/add-organization/add-organization.component';
import { HolidaysListComponent } from './core/holidays/holidays-list/holidays-list.component';
import { AddHolidayComponent } from './core/holidays/add-holiday/add-holiday.component';
import { UpdateHolidayComponent } from './core/holidays/update-holiday/update-holiday.component';
import { UpdateOrganizationComponent } from './core/organizations/update-organization/update-organization.component';
import { AnnouncementsListComponent } from './core/announcement/announcements-list/announcements-list.component';
import { AddAnnouncementsComponent } from './core/announcement/add-announcements/add-announcements.component';
import { UpdateAnnouncementComponent } from './core/announcement/update-announcement/update-announcement.component';
import { AttendanceLogsComponent } from './core/attendance/attendance-logs/attendance-logs.component';
import { CompOffRequestsComponent } from './core/attendance/comp-off-requests/comp-off-requests.component';
import { LeavesComponent } from './core/attendance/leaves/leaves.component';
import { RegularizeRequestsComponent } from './core/attendance/regularize-requests/regularize-requests.component';
import { LeavesEmpDetailsComponent } from './core/attendance/leaves-emp-details/leaves-emp-details.component';
import { TimelineComponent } from './core/timeline/timeline.component';
import { AddApplicantComponent } from './core/hiring/add-applicant/add-applicant.component';
import { HrResourceRequisitionFormComponent } from './core/MRF/hr-resource-requisition-form/hr-resource-requisition-form.component';
import { ManagerResourceRequisitionFormComponent } from './core/MRF/manager-resource-requisition-form/manager-resource-requisition-form.component';
import { AdminComponent } from './core/Settings/admin/admin.component';
import { DepartmentsComponent } from './core/Settings/departments/departments.component';
import { DesignationsComponent } from './core/Settings/designations/designations.component';
import { AdminProfileComponent } from './core/admin/admin-profile/admin-profile.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'admin',
        children:[
          {
            path: 'profile',
            component:AdminProfileComponent
          }
        ]
      },
      {
        path: 'hiring',
        children: [
          {
            path: 'list-of-jobs',
            component: HiringMainComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'jobpost',
            component: JobPostComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'edit-job-post/:id',
            component: EditJobPostComponent
          },
          {
            path: 'list-of-applicants',
            component: ApplicantsListComponent,
            canActivate: [AuthGuard]
          },
          {
            // path: 'timeline',
            path: 'timeline/:id',
            component: TimelineComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'add-applicant',
            component: AddApplicantComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'employees',
        children: [
          {
            path: 'list-of-employees',
            component: EmployeesListComponent
          },
          {
            path: 'add-employee',
            component: AddEmployeeComponent
          },
          {
            path: 'update-employee-details/:id',
            component: UpdateEmployeeDetailsComponent
          },

        ]
      },
      {
        path: 'attendance',
        children: [
          {
            path: 'attendance-logs',
            component: AttendanceLogsComponent,


          },
          {
            path: 'comp-off-request',
            component: CompOffRequestsComponent,


          },
          {
            path: 'leaves',
            component: LeavesComponent,

          },
          {
            path: 'regularize-req',
            component: RegularizeRequestsComponent,

          },
          {
            path: 'leaves-emp-details/:id',
            component: LeavesEmpDetailsComponent,

          },
        ]
      },
      {
        path: 'organizations',
        children: [
          {
            path: 'list-of-organization',
            component: ListOfOrganizationComponent
          },
          {
            path: 'add-organization',
            component: AddOrganizationComponent
          },
          {
            path: 'update-organization/:id',
            component: UpdateOrganizationComponent
          },

        ]
      },
      {
        path: 'holidays',
        children: [
          {
            path: 'holidays-list',
            component: HolidaysListComponent
          },
          {
            path: 'add-holiday',
            component: AddHolidayComponent
          },
          {
            path: 'update-holiday/:id',
            component: UpdateHolidayComponent
          },

        ]
      },
      {
        path: 'settings',
        children:[
          {
            path:'admin',
            component:AdminComponent
          },
          {
            path:'departments',
            component:DepartmentsComponent
          },
          {
            path:'designations',
            component:DesignationsComponent
          }
        ]
      },
      {
        path: 'announcement',
        children: [
          {
            path: 'announcements-list',
            component: AnnouncementsListComponent
          },
          {
            path: 'add-announcements',
            component: AddAnnouncementsComponent
          },
          {
            path: 'update-announcement/:id',
            component: UpdateAnnouncementComponent
          },

        ]
      },
      {
        path: 'mrf',
        children: [
          {
            path: 'hrResourceRequisitionForm',
            component: HrResourceRequisitionFormComponent
          },
          {
            path: 'managerResourceRequisitionForm',
            component: ManagerResourceRequisitionFormComponent
          }
        ]
      }
    ],

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
