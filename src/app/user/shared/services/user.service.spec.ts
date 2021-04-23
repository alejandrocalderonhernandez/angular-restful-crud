import { environment } from './../../../../environments/environment';
import { Support } from './../models/support.model';
import { Response } from './../models/response.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user.model';

import { UserService } from './user.service';

const usersMock = [
  new User(1, 'email@t1est.com', 'TestFirstName1', 'TestLastName1', 'http://test1.com'),
  new User(2, 'email@2test.com', 'TestFirstName2', 'TestLastName2', 'http://test2.com'),
  new User(3, 'email3@test.com', 'TestFirstName3', 'TestLastName3', 'http://test3.com')
]
const responseMock = new Response(usersMock, new Support('test', 'test'), 1, 1, 3);
const urlRequest = environment.baseUrl + 'users' ;

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(UserService);
  });

  beforeEach(() => {
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('findByPage return response and does GET request', () => {
    const pageNumber = 1;
    const uri = urlRequest + '?page=1'
    service.findByPage(pageNumber).subscribe(r => {
      expect(r).toEqual(responseMock);
    });
    const request = httpMock.expectOne(uri);
    expect(request.request.method).toBe('GET');
    request.flush(responseMock);
  })

});
