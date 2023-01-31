import { TestBed } from '@angular/core/testing';

import { PoliciesInstancesService } from './policies-instances.service';

describe('PoliciesInstancesService', () => {
  let service: PoliciesInstancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliciesInstancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
