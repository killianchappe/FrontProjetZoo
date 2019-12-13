import { TestBed } from '@angular/core/testing';

import { TestRoleService } from './test-role.service';

describe('TestRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestRoleService = TestBed.get(TestRoleService);
    expect(service).toBeTruthy();
  });
});
