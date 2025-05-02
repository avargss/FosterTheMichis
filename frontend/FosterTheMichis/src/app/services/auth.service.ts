import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private tokenService = inject(TokenService);
    private url = environment.apiUrl;

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

    logout(token: Object): Observable<any> {
        return this.http.post(`${this.url}/users/logout`, token);
    }

    register(form: Object): Observable<any> {
        return this.http.post(`${this.url}/users/register`, form);
    }

    /* me(token: Object): Observable<User> {
        return this.http.post<User>(`${this.url}/users/me`, token);
    } */

    changeAuthStatus(value: boolean) {
        this.loggedIn.next(value);
    }
}