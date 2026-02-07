import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HospitalsUserRegisterComponent } from './hospital-user-register.component';

describe('RegisterComponent', () => {
  let component: HospitalsUserRegisterComponent;
  let fixture: ComponentFixture<HospitalsUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalsUserRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalsUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
