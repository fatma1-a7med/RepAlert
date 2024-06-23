import { TestBed } from '@angular/core/testing';

import { MedicalrepService } from './medicalrep.service';

describe('MedicalrepService', () => {
  let service: MedicalrepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalrepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
