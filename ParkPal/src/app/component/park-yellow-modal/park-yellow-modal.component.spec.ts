import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkYellowModalComponent } from './park-yellow-modal.component';

describe('ParkYellowModalComponent', () => {
  let component: ParkYellowModalComponent;
  let fixture: ComponentFixture<ParkYellowModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkYellowModalComponent]
    });
    fixture = TestBed.createComponent(ParkYellowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
