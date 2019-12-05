import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferencesThingsDetailComponent } from './preferences-things-detail.component';

describe('PreferencesThingsDetailComponent', () => {
  let component: PreferencesThingsDetailComponent;
  let fixture: ComponentFixture<PreferencesThingsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferencesThingsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferencesThingsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
