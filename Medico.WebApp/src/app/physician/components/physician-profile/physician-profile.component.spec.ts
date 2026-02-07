import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianProfileComponent } from './physician-profile.component';

describe('PhysicianProfileComponent', () => {
  let component: PhysicianProfileComponent;
  let fixture: ComponentFixture<PhysicianProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicianProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicianProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
