import { TestBed, inject } from '@angular/core/testing';

import { ApiUtilityService } from './api-utility.service';

describe('ApiUtilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUtilityService]
    });
  });

  it('should be created', inject([ApiUtilityService], (service: ApiUtilityService) => {
    expect(service).toBeTruthy();
  }));
});
