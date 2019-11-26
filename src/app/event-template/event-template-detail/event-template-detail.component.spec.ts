import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTemplateDetailComponent } from './event-template-detail.component';

describe('EventTemplateDetailComponent', () => {
  let component: EventTemplateDetailComponent;
  let fixture: ComponentFixture<EventTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
