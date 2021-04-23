import { HttpClient } from '@angular/common/http';
import { ResponseDetail } from './../models/response-detail.model';
import { Injectable } from '@angular/core';
import { AbstractClientService } from 'src/app/shared/services/abstract-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService extends AbstractClientService<ResponseDetail> {

  constructor( protected client: HttpClient ) {
    super(client, 'users/');
  }

}
