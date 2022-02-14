import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private http: HttpClient) { }

  retirar(cuenta: number, monto: number): Observable<any> {
    console.log(cuenta, monto);
    
    return this.http.post('http://localhost:3000/retirar', { cuenta, monto }).pipe(catchError(this.errorHandler));
  }

  transferir(cuentaRetiro: number, cuentaTransferencia: number, monto: number): Observable<any> {
    return this.http.post('http://localhost:3000/transferir', { cuentaRetiro, cuentaTransferencia, monto }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || "Server Error");
  }
}
