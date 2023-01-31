import { TestBed } from '@angular/core/testing';

import { UsersLogsService } from './users-logs.service';

describe('UsersLogsService', () => {
  let service: UsersLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersLogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
