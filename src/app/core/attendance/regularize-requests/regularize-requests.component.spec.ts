import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizeRequestsComponent } from './regularize-requests.component';

describe('RegularizeRequestsComponent', () => {
  let component: RegularizeRequestsComponent;
  let fixture: ComponentFixture<RegularizeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegularizeRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularizeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
