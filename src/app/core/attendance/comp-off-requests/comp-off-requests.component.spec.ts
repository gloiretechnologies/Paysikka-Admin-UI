import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffRequestsComponent } from './comp-off-requests.component';

describe('CompOffRequestsComponent', () => {
  let component: CompOffRequestsComponent;
  let fixture: ComponentFixture<CompOffRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompOffRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompOffRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
