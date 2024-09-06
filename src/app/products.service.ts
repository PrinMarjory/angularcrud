import { Injectable } from '@angular/core';
import {
  NewProductInterface,
  ProductInterface,
} from './interfaces/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {
  static url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  addProduct(product: NewProductInterface): Observable<ProductInterface> {
    console.log(`Dans addProduct de ProductsService`, product);
    return this.http.post<ProductInterface>(ProductsService.url, product);
  }
}
