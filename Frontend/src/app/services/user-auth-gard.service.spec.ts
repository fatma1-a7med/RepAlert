import { TestBed } from '@angular/core/testing';

import { UserAuthGardService } from './user-auth-gard.service';

describe('UserAuthGardService', () => {
  let service: UserAuthGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
