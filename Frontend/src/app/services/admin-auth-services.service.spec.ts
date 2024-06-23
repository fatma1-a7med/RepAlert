import { TestBed } from '@angular/core/testing';

import { AdminAuthServiceService } from './admin-auth-services.service';

describe('AdminAuthServicesService', () => {
  let service: AdminAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
