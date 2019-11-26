import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandTemplateDetailComponent } from './command-template-detail.component';

describe('CommandTemplateDetailComponent', () => {
  let component: CommandTemplateDetailComponent;
  let fixture: ComponentFixture<CommandTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
