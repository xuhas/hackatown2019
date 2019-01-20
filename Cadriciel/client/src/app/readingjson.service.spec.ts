import { TestBed } from '@angular/core/testing';

import { ReadingjsonService } from './readingjson.service';

describe('ReadingjsonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReadingjsonService = TestBed.get(ReadingjsonService);
    expect(service).toBeTruthy();
  });
});
