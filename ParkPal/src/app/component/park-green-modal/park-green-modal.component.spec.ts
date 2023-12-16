import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkGreenModalComponent } from './park-green-modal.component';

describe('ParkGreenModalComponent', () => {
  let component: ParkGreenModalComponent;
  let fixture: ComponentFixture<ParkGreenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkGreenModalComponent]
    });
    fixture = TestBed.createComponent(ParkGreenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
