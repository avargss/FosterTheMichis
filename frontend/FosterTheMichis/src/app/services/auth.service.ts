import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private tokenService = inject(TokenService);
    private url = environment.apiUrl;
    private tokenKey = 'authToken';


    private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
    authStatus = this.loggedIn.asObservable();

    constructor(private http: HttpClient) { }

    login(form: Object): Observable<any> {
        return this.http.post(`${this.url}/users/login`, form).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.tokenService.set(response.token);
                    this.changeAuthStatus(true);
                }
            })
        )
    }

    logout(): void {
        // Actualiza el estado de autenticación en el frontend
        this.changeAuthStatus(false);

        // Elimina el token del almacenamiento local
        this.tokenService.remove();

        // Realiza la solicitud al backend para cerrar sesión
        const token = this.tokenService.get();
        if (token) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${token}`
                })
            };

            this.http.post(`${this.url}/users/logout`, {}, httpOptions).subscribe({
                next: () => {
                    console.log('Sesión cerrada en el backend');
                },
                error: (err) => {
                    console.error('Error al cerrar sesión en el backend:', err);
                }
            });
        }
    }

    isAdmin(): boolean {
        const token = localStorage.getItem('authToken'); // Obtén el token del almacenamiento local
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        return payload.role === 'admin'; // Verifica si el rol es "admin"
    }

    register(form: Object): Observable<any> {
        return this.http.post(`${this.url}/users/register`, form).pipe(
            tap((response: any) => {
                if (response.token) {
                    this.tokenService.set(response.token); // Guarda el token en localStorage
                    this.changeAuthStatus(true); // Actualiza el estado de autenticación
                }
            })
        );
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem(this.tokenKey); // Verifica si el token existe
        return !!token; // Devuelve true si el token existe, false si no
    }

    changeAuthStatus(value: boolean) {
        this.loggedIn.next(value);
    }

    getUserData(): Observable<any> {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.warn('No se encontró un token en el almacenamiento local.');
            return of(null);  // retorna un Observable que emite null inmediatamente
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id;
            const headers = new HttpHeaders({
                'Authorization': `Bearer ${token}`
            });
            return this.http.get(`${this.url}/users/${userId}`, { headers });
        } catch (error) {
            console.error('Error al decodificar el token:', error);
            return of(null); // en caso de error, devolvemos un Observable que emite null
        }
    }

}