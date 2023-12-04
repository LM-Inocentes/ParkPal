import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyPageUserComponent } from './penalty-page-user.component';

describe('PenaltyPageUserComponent', () => {
  let component: PenaltyPageUserComponent;
  let fixture: ComponentFixture<PenaltyPageUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenaltyPageUserComponent]
    });
    fixture = TestBed.createComponent(PenaltyPageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
