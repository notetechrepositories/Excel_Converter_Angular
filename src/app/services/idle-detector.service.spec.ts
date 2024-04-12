import { TestBed } from '@angular/core/testing';

import { IdleDetectorService } from './idle-detector.service';

describe('IdleDetectorService', () => {
  let service: IdleDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
