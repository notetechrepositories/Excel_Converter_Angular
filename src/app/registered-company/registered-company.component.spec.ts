import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCompanyComponent } from './registered-company.component';

describe('RegisteredCompanyComponent', () => {
  let component: RegisteredCompanyComponent;
  let fixture: ComponentFixture<RegisteredCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredCompanyComponent]
    });
    fixture = TestBed.createComponent(RegisteredCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
