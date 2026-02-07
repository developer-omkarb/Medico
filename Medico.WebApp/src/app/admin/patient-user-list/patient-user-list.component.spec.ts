import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientUserListComponent } from './patient-user-list.component';

describe('RegisterComponent', () => {
  let component: PatientUserListComponent;
  let fixture: ComponentFixture<PatientUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
