import { TestBed } from '@angular/core/testing';

import { CredentialsAccountService } from './credentials-account.service';

describe('CredentialsAccountService', () => {
  let service: CredentialsAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredentialsAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
