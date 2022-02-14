import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(documento: string, contra: string): Observable<any> {
    return this.http.post('http://localhost:3000/login', { documento, contra }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }

  saveDocument(documento: string): void {
    localStorage.setItem('documento', documento);
  }

  getDocument(): any {
    return localStorage.getItem('documento');
  }
}
