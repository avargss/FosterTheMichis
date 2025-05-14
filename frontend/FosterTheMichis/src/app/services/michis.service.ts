import { inject, Injectable } from '@angular/core';
import { Michi } from '../model/michis';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MichisService {
  private michis: Michi[] = [];
  michisUrl = 'http://localhost:8080/michis';

  private michisSubject = new BehaviorSubject<Michi[]>([]);
  michis$: Observable<Michi[]> = this.michisSubject.asObservable();

  http = inject(HttpClient)
  constructor() { }

  getAllMichis(): Observable<Michi[]> {
    return this.http.get<Michi[]>(this.michisUrl);
  }

  getMichiById(id: number): Observable<Michi> {
    return this.http.get<Michi>(`${this.michisUrl}/${id}`);
  }

  addMichi(michi: Michi): Observable<Michi> {
    return this.http.post<Michi>(this.michisUrl, michi);
  }

  updateMichi(michi: Michi): Observable<Michi> {
    return this.http.put<Michi>(`${this.michisUrl}/${michi.id}`, michi);
  }

  deleteMichi(id: number): Observable<void> {
    return this.http.delete<void>(`${this.michisUrl}/${id}`);
  }

  getNonAdoptableMichis(): Observable<Michi[]> {
    return this.http.get<Michi[]>(`${this.michisUrl}/non-adoptable`);
  }

  getAdoptableMichis(): Observable<Michi[]> {
    return this.http.get<Michi[]>(`${this.michisUrl}/adoptable`);
  }
}
