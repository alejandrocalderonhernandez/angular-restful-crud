import { ResponseDetail } from './../models/response-detail.model';
import { environment } from './../../../../environments/environment';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { UserDetailsService } from './user-details.service';
import { User } from '../models/user.model';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Support } from '../models/support.model';

const responseMock = new ResponseDetail(
  new User(1, 'email@t1est.com', 'TestFirstName1', 'TestLastName1', 'http://test1.com'),
  new Support('test', 'test')
)

const urlRequest = environment.baseUrl + 'users/' ;

describe('UserDetailsService', () => {
  let service: UserDetailsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserDetailsService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(UserDetailsService);
  });

  beforeEach(() => {
    service = TestBed.inject(UserDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
 
  it('findById return response and does GET request', () => {
    const id = 1;
    const uri = urlRequest + '1'
    service.findById(id).subscribe(r => {
      expect(r).toEqual(responseMock);
    });
    const request = httpMock.expectOne(uri);
    expect(request.request.method).toBe('GET');
    request.flush(responseMock);
  })

  it('create return response and does POST request', () => {
    service.create(responseMock).subscribe(r => {
      expect(r).toEqual(responseMock);
    });
    const request = httpMock.expectOne(urlRequest);
    expect(request.request.method).toBe('POST');
    request.flush(responseMock);
  })

  it('update return response and does PUT request', () => {
    const id = 1;
    const uri = urlRequest + '1'
    service.update(id, responseMock).subscribe(r => {
      expect(r).toEqual(responseMock);
    });
    const request = httpMock.expectOne(uri);
    expect(request.request.method).toBe('PUT');
    request.flush(responseMock);
  })

  it('delete return response and does DELETE request', () => {
    const id = 1;
    const uri = urlRequest + '1'
    service.delete(id).subscribe();
    const request = httpMock.expectOne(uri);
    expect(request.request.method).toBe('DELETE');
    request.flush(responseMock);
  })

});
