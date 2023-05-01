
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavbarComponent } from './core/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './core/top-navbar/top-navbar.component';

import { LayoutComponent } from './layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HiringMainComponent } from './core/hiring/hiring-main/hiring-main.component';
import { JobPostComponent } from './core/hiring/job-post/job-post.component';
import { JobUpdateComponent } from './core/hiring/job-update/job-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditJobPostComponent } from './core/hiring/edit-job-post/edit-job-post.component';
import { ApplicantsListComponent } from './core/hiring/applicants-list/applicants-list.component';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppInterceptor } from './_interceptor/app.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NgToastModule } from 'ng-angular-popup'
import { ModalComponent } from './shared/modal/modal.component';
import { NgbModalModule, NgbModule, NgbNavConfig, NgbNavItem, NgbNavModule, NgbPaginationModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { OrderModule } from 'ngx-order-pipe';

import { NgxEditorModule } from 'ngx-editor';
import { EmployeesListComponent } from './core/employees/employees-list/employees-list.component';
import { DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UpdateEmployeeDetailsComponent } from './core/employees/update-employee-details/update-employee-details.component';
import { AddEmployeeComponent } from './core/employees/add-employee/add-employee.component';
import { AddOrganizationComponent } from './core/organizations/add-organization/add-organization.component';
import { ListOfOrganizationComponent } from './core/organizations/list-of-organization/list-of-organization.component';
import { HolidaysListComponent } from './core/holidays/holidays-list/holidays-list.component';
import { AddHolidayComponent } from './core/holidays/add-holiday/add-holiday.component';
import { UpdateHolidayComponent } from './core/holidays/update-holiday/update-holiday.component';
import { UpdateOrganizationComponent } from './core/organizations/update-organization/update-organization.component';
import { AddAnnouncementsComponent } from './core/announcement/add-announcements/add-announcements.component';
import { AnnouncementsListComponent } from './core/announcement/announcements-list/announcements-list.component';
import { UpdateAnnouncementComponent } from './core/announcement/update-announcement/update-announcement.component';
import { SearchPipe } from './shared/services/pipes/search.pipe';
import { TextHighlightPipe } from './shared/services/pipes/text-highlight.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { AttendanceLogsComponent } from './core/attendance/attendance-logs/attendance-logs.component';
import { CompOffRequestsComponent } from './core/attendance/comp-off-requests/comp-off-requests.component';
import { LeavesComponent } from './core/attendance/leaves/leaves.component';
import { LeavesEmpDetailsComponent } from './core/attendance/leaves-emp-details/leaves-emp-details.component';
import { RegularizeRequestsComponent } from './core/attendance/regularize-requests/regularize-requests.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgApexchartsModule } from "ng-apexcharts";
import { TimelineComponent } from './core/timeline/timeline.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { AddApplicantComponent } from './core/hiring/add-applicant/add-applicant.component';
import { HrResourceRequisitionFormComponent } from './core/MRF/hr-resource-requisition-form/hr-resource-requisition-form.component';
import { ManagerResourceRequisitionFormComponent } from './core/MRF/manager-resource-requisition-form/manager-resource-requisition-form.component';
import { AdminComponent } from './core/Settings/admin/admin.component';
import { DepartmentsComponent } from './core/Settings/departments/departments.component';
import { DesignationsComponent } from './core/Settings/designations/designations.component';
import { ServerIssueComponent } from './core/status_errors/server-issue/server-issue.component';
import { AdminProfileComponent } from './core/admin/admin-profile/admin-profile.component';
import { OpenPositionsComponent } from './core/admin/open-positions/open-positions.component';



@NgModule({
  declarations: [
    AppComponent,
    SideNavbarComponent,
    TopNavbarComponent,
    LayoutComponent,
    HiringMainComponent,
    JobPostComponent,
    JobUpdateComponent,
    EditJobPostComponent,
    ApplicantsListComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    EmployeesListComponent,
    UpdateEmployeeDetailsComponent,
    AddEmployeeComponent,
    AddOrganizationComponent,
    ListOfOrganizationComponent,
    HolidaysListComponent,
    AddHolidayComponent,
    UpdateHolidayComponent,
    UpdateOrganizationComponent,
    AddAnnouncementsComponent,
    AnnouncementsListComponent,
    UpdateAnnouncementComponent,
    SearchPipe,
    TextHighlightPipe,
    AttendanceLogsComponent,
    CompOffRequestsComponent,
    LeavesComponent,
    LeavesEmpDetailsComponent,
    RegularizeRequestsComponent,
    TimelineComponent,
    AddApplicantComponent,
    HrResourceRequisitionFormComponent,
    ManagerResourceRequisitionFormComponent,
    DashboardComponent,
    AdminComponent,
    DepartmentsComponent,
    DesignationsComponent,
    ServerIssueComponent,
    AdminProfileComponent,
    OpenPositionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    NgbModalModule,
    OrderModule,
    NgxEditorModule,
    NgbToastModule,
    NgbModalModule,
    NgbModule,
    NgbNavModule,
    FormsModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgApexchartsModule,
    // NgChartsModule,
    // NgChartsModule.forRoot(),
    //ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    ConfirmBoxConfigModule.forRoot() // Essential, mandatory confirm box module. 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [DatePipe,DashboardComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,

      multi: true
    },
    {provide: LocationStrategy, useClass: PathLocationStrategy}, NgbNavConfig,
    // { provide: NgChartsConfiguration, useValue: { generateColors: false }}
  ],

  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
