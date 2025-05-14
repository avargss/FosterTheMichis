import { inject, Injectable } from '@angular/core';
import { Bookings } from '../model/bookings';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get<Bookings[]>(this.bookingsUrl);
  }

  getBookingById(id: number): Observable<Bookings> {
    return this.http.get<Bookings>(`${this.bookingsUrl}/${id}`);
  }

  addBooking(booking: Bookings): Observable<Bookings> {
    return this.http.post<Bookings>(this.bookingsUrl, booking);
  }

  updateBooking(booking: Bookings): Observable<Bookings> {
    return this.http.put<Bookings>(`${this.bookingsUrl}/${booking.id}`, booking);
  }

  deleteBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.bookingsUrl}/${id}`);
  }
}
