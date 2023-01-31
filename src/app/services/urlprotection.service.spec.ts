import { TestBed } from '@angular/core/testing';

import { UrlprotectionService } from './urlprotection.service';

describe('UrlprotectionService', () => {
  let service: UrlprotectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlprotectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
