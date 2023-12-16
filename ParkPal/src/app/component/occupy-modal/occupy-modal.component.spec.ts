import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupyModalComponent } from './occupy-modal.component';

describe('OccupyModalComponent', () => {
  let component: OccupyModalComponent;
  let fixture: ComponentFixture<OccupyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupyModalComponent]
    });
    fixture = TestBed.createComponent(OccupyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
