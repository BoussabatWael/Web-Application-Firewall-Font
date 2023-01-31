import { TestBed } from '@angular/core/testing';

import { ApikeyPermissionsService } from './apikey-permissions.service';

describe('ApikeyPermissionsService', () => {
  let service: ApikeyPermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApikeyPermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
