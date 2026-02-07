import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionTemplateComponent } from './prescription-template.component';

describe('PrescriptionTemplateComponent', () => {
  let component: PrescriptionTemplateComponent;
  let fixture: ComponentFixture<PrescriptionTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
