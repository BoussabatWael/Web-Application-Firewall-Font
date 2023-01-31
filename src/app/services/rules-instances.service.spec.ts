import { TestBed } from '@angular/core/testing';

import { RulesInstancesService } from './rules-instances.service';

describe('RulesInstancesService', () => {
  let service: RulesInstancesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RulesInstancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
