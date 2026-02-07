import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsignsBarComponent } from './vitalsigns-bar.component';

describe('VitalsignsBarComponent', () => {
  let component: VitalsignsBarComponent;
  let fixture: ComponentFixture<VitalsignsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VitalsignsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VitalsignsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
