import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Area2MapComponent } from './area2-map.component';

describe('Area2MapComponent', () => {
  let component: Area2MapComponent;
  let fixture: ComponentFixture<Area2MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Area2MapComponent]
    });
    fixture = TestBed.createComponent(Area2MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
