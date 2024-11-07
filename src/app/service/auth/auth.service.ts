import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post('/api/auth/reset-password', { email });
  }

  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post('/api/auth/change-password', { currentPassword, newPassword });
  }
}
