import { Response } from './../models/response.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractClientService } from '../../../shared/services/abstract-client.service'

@Injectable({
  providedIn: 'root'
})

export class UserService extends AbstractClientService<Response>{
 
  constructor( protected client: HttpClient ) {
    super(client, '/');
  }
}
