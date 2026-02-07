import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSearchCardComponent } from './doctor-search-card.component';

describe('DoctorSearchCardComponent', () => {
  let component: DoctorSearchCardComponent;
  let fixture: ComponentFixture<DoctorSearchCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorSearchCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
