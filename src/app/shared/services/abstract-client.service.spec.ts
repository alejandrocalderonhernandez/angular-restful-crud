import { TestBed } from '@angular/core/testing';

import { AbstractClientService } from './abstract-client.service';

describe('AbstractClientService', () => {
  let service: AbstractClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
