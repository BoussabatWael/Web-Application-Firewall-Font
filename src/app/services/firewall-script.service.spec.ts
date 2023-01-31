import { TestBed } from '@angular/core/testing';

import { FirewallScriptService } from './firewall-script.service';

describe('FirewallScriptService', () => {
  let service: FirewallScriptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirewallScriptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
