import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSchedularComponent } from './emp-schedular.component';

describe('EmpSchedularComponent', () => {
  let component: EmpSchedularComponent;
  let fixture: ComponentFixture<EmpSchedularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSchedularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSchedularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
