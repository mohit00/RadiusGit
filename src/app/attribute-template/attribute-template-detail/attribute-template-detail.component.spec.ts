import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTemplateDetailComponent } from './attribute-template-detail.component';

describe('AttributeTemplateDetailComponent', () => {
  let component: AttributeTemplateDetailComponent;
  let fixture: ComponentFixture<AttributeTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
