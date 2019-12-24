import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignThingPreferenceDialogComponent } from './assign-thing-preference-dialog.component';

describe('AssignThingPreferenceDialogComponent', () => {
  let component: AssignThingPreferenceDialogComponent;
  let fixture: ComponentFixture<AssignThingPreferenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignThingPreferenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignThingPreferenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
