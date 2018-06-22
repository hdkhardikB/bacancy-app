import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
@Injectable()
export class ApiUtilityService {
  constructor(
    private http: Http, private toaster: ToastrService, private jwtService: JwtService
  ) { }


  /**
   * To set headers in requst.
   */
  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['x-access-token'] = this.jwtService.getToken();
    }
    return new Headers(headersConfig);
  }

  /**
   * To set errors during API call.
   * @param result 
   */
  private formatErrors(error: HttpErrorResponse) {
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error}`);
    }
    // return an observable with a user-facing error message
    this.toaster.error('There was an error serving you request.', 'Error');
    return throwError('There was an error serving you request.');
  }

  /**
   * To make an HTTP get call.
   * @param path - a url to be called.
   * @param params - parameters to be passed in query string.
   */
  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { headers: this.setHeaders(), search: params }).
      pipe(map((resp: Response) => resp.json()), catchError(this.formatErrors));

  }

  /**
   * To make an HTTP Put call.
   * @param path - a url to be called.
   * @param body - put request body to passed.
   */
  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(map((resp: Response) => resp.json()), catchError(this.formatErrors));
  }

  /**
   * To make an HTTP Post call.
   * @param path - a url to be called.
   * @param body - post request body to passed.
   */
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).
      pipe(map((resp: Response) => resp.json()), catchError(this.formatErrors));
  }

  /**
   * To make an HTTP delete call.
   * @param path - a url to be called.
   */
  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`,
      { headers: this.setHeaders() }
    ).
      pipe(map((resp: Response) => resp.json()), catchError(this.formatErrors));
  }
}
