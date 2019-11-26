import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateAccountComponent } from './migrate-account.component';

describe('MigrateAccountComponent', () => {
  let component: MigrateAccountComponent;
  let fixture: ComponentFixture<MigrateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
