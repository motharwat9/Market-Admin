import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, Observable, throwError, catchError } from 'rxjs';
import { Iproduct } from 'src/app/model/iproduct';
import { NewProduct } from 'src/app/model/new-product';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  private handleError(error: HttpErrorResponse) {
    if(error.status === 404){
      return throwError(() => new Error('Error in Server'));
    }else if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    // console.error('An error occurred:', error.error);
    return throwError(() => new Error('ERR_INTERNET_DISCONNECTED'));
  } 
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
  getProductByTd(productId:number):Observable<Iproduct>{
    return this.http.get<Iproduct>(`${environment.APIURL}/products/${productId}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getAllProducts():Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(`${environment.APIURL}/products`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getAllCategory():Observable<string[]>{
    return this.http.get<string[]>(`${environment.APIURL}/products/categories`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  createNewProduct(newProduct:any):Observable<NewProduct>{
    return this.http.post<NewProduct>(`${environment.APIURL}/products`,newProduct).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  updateProduct(newProduct:any,id:number):Observable<NewProduct>{
    return this.http.put<NewProduct>(`${environment.APIURL}/products/${id}`,newProduct).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
