import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientVisitHistoryComponent } from './view-patient-visit-history.component';

describe('ViewPatientVisitHistoryComponent', () => {
  let component: ViewPatientVisitHistoryComponent;
  let fixture: ComponentFixture<ViewPatientVisitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPatientVisitHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPatientVisitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
