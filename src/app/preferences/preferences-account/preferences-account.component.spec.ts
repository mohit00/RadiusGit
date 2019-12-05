import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesAccountComponent } from './preferences-account.component';

describe('PreferencesAccountComponent', () => {
  let component: PreferencesAccountComponent;
  let fixture: ComponentFixture<PreferencesAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
