import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerIssueComponent } from './server-issue.component';

describe('ServerIssueComponent', () => {
  let component: ServerIssueComponent;
  let fixture: ComponentFixture<ServerIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
