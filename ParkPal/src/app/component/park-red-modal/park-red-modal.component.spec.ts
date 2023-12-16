import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkRedModalComponent } from './park-red-modal.component';

describe('ParkRedModalComponent', () => {
  let component: ParkRedModalComponent;
  let fixture: ComponentFixture<ParkRedModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkRedModalComponent]
    });
    fixture = TestBed.createComponent(ParkRedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
