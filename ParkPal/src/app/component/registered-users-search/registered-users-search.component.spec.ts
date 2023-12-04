import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUsersSearchComponent } from './registered-users-search.component';

describe('RegisteredUsersSearchComponent', () => {
  let component: RegisteredUsersSearchComponent;
  let fixture: ComponentFixture<RegisteredUsersSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredUsersSearchComponent]
    });
    fixture = TestBed.createComponent(RegisteredUsersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
