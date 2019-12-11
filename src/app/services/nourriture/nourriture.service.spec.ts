import { TestBed } from '@angular/core/testing';

import { NourritureService } from './nourriture.service';

describe('NourritureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NourritureService = TestBed.get(NourritureService);
    expect(service).toBeTruthy();
  });
});
