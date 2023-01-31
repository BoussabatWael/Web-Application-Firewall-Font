import { TestBed } from '@angular/core/testing';

import { UsersServersRulesService } from './users-servers-rules.service';

describe('UsersServersRulesService', () => {
  let service: UsersServersRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersServersRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
