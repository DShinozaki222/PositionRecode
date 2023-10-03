import { TestBed } from '@angular/core/testing';

import { StoreManagedService } from './store-managed.service';

describe('StoreManagedService', () => {
  let service: StoreManagedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreManagedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
