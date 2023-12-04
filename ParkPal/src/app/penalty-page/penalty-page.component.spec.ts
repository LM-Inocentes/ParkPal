import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyPageComponent } from './penalty-page.component';

describe('PenaltyPageComponent', () => {
  let component: PenaltyPageComponent;
  let fixture: ComponentFixture<PenaltyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenaltyPageComponent]
    });
    fixture = TestBed.createComponent(PenaltyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
