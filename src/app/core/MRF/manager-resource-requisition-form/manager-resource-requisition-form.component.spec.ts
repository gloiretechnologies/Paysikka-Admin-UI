import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerResourceRequisitionFormComponent } from './manager-resource-requisition-form.component';

describe('ManagerResourceRequisitionFormComponent', () => {
  let component: ManagerResourceRequisitionFormComponent;
  let fixture: ComponentFixture<ManagerResourceRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerResourceRequisitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerResourceRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
