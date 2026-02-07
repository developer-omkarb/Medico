import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardcardsbarComponent } from './dashboardcardsbar.component';

describe('DashboardcardsbarComponent', () => {
  let component: DashboardcardsbarComponent;
  let fixture: ComponentFixture<DashboardcardsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardcardsbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardcardsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
