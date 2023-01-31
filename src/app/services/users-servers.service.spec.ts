import { TestBed } from '@angular/core/testing';

import { UsersServersService } from './users-servers.service';

describe('UsersServersService', () => {
  let service: UsersServersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersServersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
