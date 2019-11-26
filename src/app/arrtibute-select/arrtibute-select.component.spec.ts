import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrtibuteSelectComponent } from './arrtibute-select.component';

describe('ArrtibuteSelectComponent', () => {
  let component: ArrtibuteSelectComponent;
  let fixture: ComponentFixture<ArrtibuteSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrtibuteSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrtibuteSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
