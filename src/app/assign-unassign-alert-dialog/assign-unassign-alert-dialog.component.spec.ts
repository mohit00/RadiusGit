import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUnassignAlertDialogComponent } from './assign-unassign-alert-dialog.component';

describe('AssignUnassignAlertDialogComponent', () => {
  let component: AssignUnassignAlertDialogComponent;
  let fixture: ComponentFixture<AssignUnassignAlertDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUnassignAlertDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUnassignAlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
