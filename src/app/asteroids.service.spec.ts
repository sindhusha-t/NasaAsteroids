import { TestBed } from '@angular/core/testing';

import { AsteroidsService } from './asteroids.service';

describe('AsteroidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsteroidsService = TestBed.get(AsteroidsService);
    expect(service).toBeTruthy();
  });
});
