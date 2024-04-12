import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserComponent } from './registered-user.component';

describe('RegisteredUserComponent', () => {
  let component: RegisteredUserComponent;
  let fixture: ComponentFixture<RegisteredUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredUserComponent]
    });
    fixture = TestBed.createComponent(RegisteredUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
