import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotAndResetComponent } from './forgot-and-reset.component';

describe('ForgotAndResetComponent', () => {
  let component: ForgotAndResetComponent;
  let fixture: ComponentFixture<ForgotAndResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotAndResetComponent]
    });
    fixture = TestBed.createComponent(ForgotAndResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
