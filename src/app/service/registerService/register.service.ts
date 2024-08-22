import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8848/api/check/auth'; // Replace with your actual API URL

  constructor(private http: HttpClient) { }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }
}