import { Injectable, inject } from '@angular/core';
import { ApiService, AppConfig } from '@workspace/shared-ui';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiService = inject(ApiService);
  private http = inject(HttpClient); 
  private appConf = inject(AppConfig);

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
  if (typeof window !== 'undefined') { 
    const user = this.getUser();
    this.userSubject.next(user);
  }
}

  login(username: string, password: string): Observable<any> {
    const url = 'api/login';
    const payload = { username, password };

    return this.apiService.post(url, payload).pipe(
      tap((response: any) => {
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any | null {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getUserDetails(): Observable<any> {
    const token = this.getToken();
    if (!token) throw new Error('No token found');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = 'api/user/me';

    return this.http.get(url, { headers }).pipe(
      tap(user => {
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      })
    );
  }
}