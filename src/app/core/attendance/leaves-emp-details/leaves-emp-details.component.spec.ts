import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesEmpDetailsComponent } from './leaves-emp-details.component';

describe('LeavesEmpDetailsComponent', () => {
  let component: LeavesEmpDetailsComponent;
  let fixture: ComponentFixture<LeavesEmpDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeavesEmpDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeavesEmpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
