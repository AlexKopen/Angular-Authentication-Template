import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ENDPOINT } from './endpoint.constants';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Post } from './models/post.model';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Array<Post>> {
    return this.http
      .get(ENDPOINT.postsURL, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`)
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors, if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return Observable.throw(err.message || err);
  }

}
