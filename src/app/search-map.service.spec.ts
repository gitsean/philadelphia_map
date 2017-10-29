import { TestBed, inject } from '@angular/core/testing';

import { SearchMapService } from './search-map.service';

describe('SearchMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchMapService]
    });
  });

  it('should be created', inject([SearchMapService], (service: SearchMapService) => {
    expect(service).toBeTruthy();
  }));
});
