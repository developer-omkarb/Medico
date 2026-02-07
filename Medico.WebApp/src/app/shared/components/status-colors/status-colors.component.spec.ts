import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusColorsComponent } from './status-colors.component';

describe('StatusColorsComponent', () => {
  let component: StatusColorsComponent;
  let fixture: ComponentFixture<StatusColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusColorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
