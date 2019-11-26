import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProvisiongDetailComponent } from './device-provisiong-detail.component';

describe('DeviceProvisiongDetailComponent', () => {
  let component: DeviceProvisiongDetailComponent;
  let fixture: ComponentFixture<DeviceProvisiongDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProvisiongDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProvisiongDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
