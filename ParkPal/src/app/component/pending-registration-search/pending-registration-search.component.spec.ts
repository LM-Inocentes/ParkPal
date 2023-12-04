import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingRegistrationSearchComponent } from './pending-registration-search.component';

describe('PendingRegistrationSearchComponent', () => {
  let component: PendingRegistrationSearchComponent;
  let fixture: ComponentFixture<PendingRegistrationSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingRegistrationSearchComponent]
    });
    fixture = TestBed.createComponent(PendingRegistrationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
