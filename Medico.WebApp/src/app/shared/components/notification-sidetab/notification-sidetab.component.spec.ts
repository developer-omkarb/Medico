import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSidetabComponent } from './notification-sidetab.component';

describe('NotificationSidetabComponent', () => {
  let component: NotificationSidetabComponent;
  let fixture: ComponentFixture<NotificationSidetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSidetabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationSidetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
