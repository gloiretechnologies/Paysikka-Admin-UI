import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrResourceRequisitionFormComponent } from './hr-resource-requisition-form.component';

describe('HrResourceRequisitionFormComponent', () => {
  let component: HrResourceRequisitionFormComponent;
  let fixture: ComponentFixture<HrResourceRequisitionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrResourceRequisitionFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrResourceRequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
