import { inject, Injectable } from '@angular/core';
import { User } from '../model/users';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [];
  usersUrl = 'http://localhost:8080/users';

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this.usersSubject.asObservable();

  http = inject(HttpClient)
  constructor() { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: number): Observable<User> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.get<User>(`${this.usersUrl}/${id}`, { headers });
  }

  addUser(user: User): Observable<User> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.post<User>(this.usersUrl, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.put<User>(`${this.usersUrl}/${user.id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.delete<void>(`${this.usersUrl}/${id}`, { headers });
  }
}
