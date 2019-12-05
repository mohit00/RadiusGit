import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesAccountDetailComponent } from './preferences-account-detail.component';

describe('PreferencesAccountDetailComponent', () => {
  let component: PreferencesAccountDetailComponent;
  let fixture: ComponentFixture<PreferencesAccountDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesAccountDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesAccountDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
