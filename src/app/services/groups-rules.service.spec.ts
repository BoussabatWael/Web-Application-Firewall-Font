import { TestBed } from '@angular/core/testing';

import { GroupsRulesService } from './groups-rules.service';

describe('GroupsRulesService', () => {
  let service: GroupsRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
