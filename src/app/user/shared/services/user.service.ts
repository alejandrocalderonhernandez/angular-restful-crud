import { HttpClient } from '@angular/common/http';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AbstractClientService } from '../../../shared/services/abstract-client.service'

@Injectable({
  providedIn: 'root'
})

export class UserService extends AbstractClientService<User>{

  constructor( protected client: HttpClient) {
    super(client, '/');
  }
}
