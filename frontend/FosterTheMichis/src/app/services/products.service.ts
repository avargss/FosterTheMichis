import { inject, Injectable } from '@angular/core';
import { Products } from '../model/products';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Products[] = [];
  productsUrl = 'http://localhost:8080/products';

  private productsSubject = new BehaviorSubject<Products[]>([]);
  products$: Observable<Products[]> = this.productsSubject.asObservable();

  http = inject(HttpClient)
  constructor() { }

  getAllProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(this.productsUrl);
  }

  getProductById(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.productsUrl}/${id}`);
  }

  addProduct(product: Products): Observable<Products> {
    return this.http.post<Products>(this.productsUrl, product);
  }

  updateProduct(product: Products): Observable<Products> {
    return this.http.put<Products>(`${this.productsUrl}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.productsUrl}/${id}`);
  }

  // Método para obtener productos por categoría usando el ID numérico
  getProductsByCategory(categoryId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.productsUrl}?categoryId=${categoryId}`);
  }

}
