import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesThingsComponent } from './preferences-things.component';

describe('PreferencesThingsComponent', () => {
  let component: PreferencesThingsComponent;
  let fixture: ComponentFixture<PreferencesThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesThingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
