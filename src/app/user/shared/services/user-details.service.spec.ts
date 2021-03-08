import { ResponseDetail } from './../models/response-detail.model';
import { Response } from './../models/response.model';
import { TestBed } from '@angular/core/testing';

import { UserDetailsService } from './user-details.service';
import { User } from '../models/user.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('UserDetailsService', () => {
  let service: UserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserDetailsService]
    });
    service = TestBed.inject(UserDetailsService);
  });

  it('should be created a new user', () => {
    const userPost = new ResponseDetail(new User(1000, 'Test', 'Test', 'Test', 'Test'));
    service.create(userPost).subscribe( r => {
      r.data.first_name
      expect( r.data.first_name).toEqual('Test');
    })
 
  });
});
