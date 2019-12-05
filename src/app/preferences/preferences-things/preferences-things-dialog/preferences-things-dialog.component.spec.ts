import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesThingsDialogComponent } from './preferences-things-dialog.component';

describe('PreferencesThingsDialogComponent', () => {
  let component: PreferencesThingsDialogComponent;
  let fixture: ComponentFixture<PreferencesThingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesThingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesThingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
