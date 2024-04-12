import { TestBed } from '@angular/core/testing';

import { ForgotAndResetService } from './forgot-and-reset.service';

describe('ForgotAndResetService', () => {
  let service: ForgotAndResetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgotAndResetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
