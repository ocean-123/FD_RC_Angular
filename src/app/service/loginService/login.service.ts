import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8848/api/check/auth/authenticate'; // Replace this with your actual backend URL

  constructor(private http: HttpClient) { }

  loginUser(userData: any) {
    return this.http.post(this.apiUrl, userData);
  }
  isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // For example, check if a token is present in local storage
    return localStorage.getItem('token') !== null;
  }
}
