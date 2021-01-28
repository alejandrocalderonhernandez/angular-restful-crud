import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class AbstractClientService<T> {

  constructor( protected client: HttpClient, protected resource: string ) { }

  public findByPage(page: number): Observable<T> {
    const endpoint = `${environment.baseUrl}${this.resource}${page}`;
    const params = new HttpParams();
    params.set('page', page.toString());
    return this.client.get<T>(endpoint, {params});
  }

  public findById(id: number): Observable<T> {
    const endpoint = `${environment.baseUrl}${this.resource}${id}`;
    return this.client.get<T>(endpoint);
  }

  public create(resource: T): Observable<T> {
    const endpoint = `${environment.baseUrl}${this.resource}`;
    return this.client.post<T>(endpoint, resource);
  }

  public update(id: number, resource: T): Observable<T> {
    const endpoint = `${environment.baseUrl}${this.resource}${id}`;
    return this.client.put<T>(endpoint, resource);
  }
  
  public delete(id: number): Observable<void> {
    const endpoint = `${environment.baseUrl}${this.resource}${id}`;
    return this.client.delete<void>(endpoint);
  }
  
}
