import { TestBed } from '@angular/core/testing';

import { AuthCtlService } from './auth-ctl.service';

describe('AuthCtlService', () => {
  let service: AuthCtlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCtlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
