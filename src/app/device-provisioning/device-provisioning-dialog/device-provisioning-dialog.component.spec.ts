import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceProvisioningDialogComponent } from './device-provisioning-dialog.component';

describe('DeviceProvisioningDialogComponent', () => {
  let component: DeviceProvisioningDialogComponent;
  let fixture: ComponentFixture<DeviceProvisioningDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceProvisioningDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceProvisioningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
