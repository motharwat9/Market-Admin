import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Carts } from 'src/app/model/carts';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('Error in Server'));
    } else if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error);
      return throwError(() => new Error('ERR_INTERNET_DISCONNECTED'));
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
  getAllCarts(): Observable<Carts[]> {
    return this.http
      .get<Carts[]>(`${environment.APIURL}/carts`)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAllCartsByDateRan(dateRange:any): Observable<Carts[]> {
    let params=new HttpParams()
    params=params.append('startdate',dateRange.start).append('enddate',dateRange.end)
    return this.http
      .get<Carts[]>(`${environment.APIURL}/carts`,{params})
      .pipe(retry(2), catchError(this.handleError));
  }
  deleteCart(id:number): Observable<Carts> {

    return this.http
      .delete<Carts>(`${environment.APIURL}/carts/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
