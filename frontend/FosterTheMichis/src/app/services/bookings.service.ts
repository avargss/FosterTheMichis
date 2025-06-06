import { inject, Injectable } from '@angular/core';
import { Bookings } from '../model/bookings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookings: Bookings[] = [];
  bookingsUrl = 'http://localhost:8080/bookings';

  private bookingsSubject = new BehaviorSubject<Bookings[]>([]);
  bookings$: Observable<Bookings[]> = this.bookingsSubject.asObservable();

  http = inject(HttpClient)
  constructor() { }

  getAllBookings(): Observable<Bookings[]> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.get<Bookings[]>(this.bookingsUrl, { headers });
  }

  getBookingById(id: number): Observable<Bookings> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.get<Bookings>(`${this.bookingsUrl}/${id}`, { headers });
  }

  getBookingsByUserId(userId: number): Observable<any[]> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.get<any[]>(`http://localhost:8080/bookings/user/${userId}`, { headers });
  }

  addBooking(booking: Bookings): Observable<Bookings> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.post<Bookings>(this.bookingsUrl, booking, { headers });
  }

  updateBooking(booking: Bookings): Observable<Bookings> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.put<Bookings>(`${this.bookingsUrl}/${booking.id}`, booking, { headers });
  }

  deleteBooking(id: number): Observable<void> {
    const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });

    return this.http.delete<void>(`${this.bookingsUrl}/${id}`, { headers });
  }
}
