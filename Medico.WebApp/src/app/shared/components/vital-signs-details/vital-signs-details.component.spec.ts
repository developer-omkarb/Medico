import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalSignsDetailsComponent } from './vital-signs-details.component';

describe('VitalSignsDetailsComponent', () => {
  let component: VitalSignsDetailsComponent;
  let fixture: ComponentFixture<VitalSignsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalSignsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalSignsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
