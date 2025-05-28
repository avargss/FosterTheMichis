import { inject, Injectable } from '@angular/core';
import { Michi } from '../model/michis';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.post<Michi>(this.michisUrl, michi, { headers });
  }

  updateMichi(michi: Michi): Observable<Michi> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.put<Michi>(`${this.michisUrl}/${michi.id}`, michi, { headers });
  }

  deleteMichi(id: number): Observable<void> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.delete<void>(`${this.michisUrl}/${id}`, { headers });
  }

  getNonAdoptableMichis(): Observable<Michi[]> {
    return this.http.get<Michi[]>(`${this.michisUrl}/non-adoptable`);
  }

  getAdoptableMichis(): Observable<Michi[]> {
    return this.http.get<Michi[]>(`${this.michisUrl}/adoptable`);
  }

  getBreeds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.michisUrl}/breeds`);
  }
}
