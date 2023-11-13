import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Area1MapComponent } from './area1-map.component';

describe('Area1MapComponent', () => {
  let component: Area1MapComponent;
  let fixture: ComponentFixture<Area1MapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Area1MapComponent]
    });
    fixture = TestBed.createComponent(Area1MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
