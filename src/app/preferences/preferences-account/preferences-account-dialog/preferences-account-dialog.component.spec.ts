import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesAccountDialogComponent } from './preferences-account-dialog.component';

describe('PreferencesAccountDialogComponent', () => {
  let component: PreferencesAccountDialogComponent;
  let fixture: ComponentFixture<PreferencesAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
