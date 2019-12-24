import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAccountPreferenceDialogComponent } from './assign-account-preference-dialog.component';

describe('AssignAccountPreferenceDialogComponent', () => {
  let component: AssignAccountPreferenceDialogComponent;
  let fixture: ComponentFixture<AssignAccountPreferenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignAccountPreferenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignAccountPreferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
