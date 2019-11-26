import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeTemplateComponent } from './attribute-template.component';

describe('AttributeTemplateComponent', () => {
  let component: AttributeTemplateComponent;
  let fixture: ComponentFixture<AttributeTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttributeTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
