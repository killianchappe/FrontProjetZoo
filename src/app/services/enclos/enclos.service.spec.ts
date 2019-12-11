import { TestBed } from '@angular/core/testing';

import { EnclosService } from './enclos.service';

describe('EnclosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnclosService = TestBed.get(EnclosService);
    expect(service).toBeTruthy();
  });
});
