import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    console.log('iyh iyh hadik 3arfha')
    return this.http.post(`${this.apiUrl}/register`, { email, password, firstName, lastName });

  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      map((response: any) => response.token)
    );
  }
}
