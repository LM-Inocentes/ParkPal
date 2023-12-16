import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyPageSearchComponent } from './penalty-page-search.component';

describe('PenaltyPageSearchComponent', () => {
  let component: PenaltyPageSearchComponent;
  let fixture: ComponentFixture<PenaltyPageSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenaltyPageSearchComponent]
    });
    fixture = TestBed.createComponent(PenaltyPageSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
