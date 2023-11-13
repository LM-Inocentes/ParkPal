import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Area3MapComponent } from './area3-map.component';

describe('Area3MapComponent', () => {
  let component: Area3MapComponent;
  let fixture: ComponentFixture<Area3MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Area3MapComponent]
    });
    fixture = TestBed.createComponent(Area3MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
