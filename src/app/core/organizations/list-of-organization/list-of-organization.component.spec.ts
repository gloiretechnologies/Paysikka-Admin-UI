import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfOrganizationComponent } from './list-of-organization.component';

describe('ListOfOrganizationComponent', () => {
  let component: ListOfOrganizationComponent;
  let fixture: ComponentFixture<ListOfOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
