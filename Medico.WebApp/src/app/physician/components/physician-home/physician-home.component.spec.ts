import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianHomeComponent } from './physician-home.component';

describe('PhysicianHomeComponent', () => {
  let component: PhysicianHomeComponent;
  let fixture: ComponentFixture<PhysicianHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
