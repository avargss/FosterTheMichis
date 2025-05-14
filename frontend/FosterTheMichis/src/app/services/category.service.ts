import { inject, Injectable } from '@angular/core';
import { Categories } from '../model/category';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Categories[] = [];
  categoriesUrl = 'http://localhost:8080/categories';

  private categoriesSubject = new BehaviorSubject<Categories[]>([]);
  categories$: Observable<Categories[]> = this.categoriesSubject.asObservable();

  http = inject(HttpClient)
  constructor() { }

  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.categoriesUrl);
  }

  getCategoryById(id: number): Observable<Categories> {
    return this.http.get<Categories>(`${this.categoriesUrl}/${id}`);
  }

  addCategory(category: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.categoriesUrl, category);
  }

  updateCategory(category: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.categoriesUrl}/${category.id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoriesUrl}/${id}`);
  }
}
