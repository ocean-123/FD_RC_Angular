import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  // constructor() { }

  // private isLoggedIn = false;

  // get loggedIn(): boolean {
  //   return this.isLoggedIn;
  // }

  // login() {
  //   this.isLoggedIn = true;
  // }

  // logout() {
  //   this.isLoggedIn = false;
  

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private readonly AUTH_STORAGE_KEY = 'isAuthenticated';

  constructor() {
    // Initialize authentication state from local storage
    this.isAuthenticatedSubject.next(this.isAuthenticatedInStorage());
  }

  // Method to check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Method to set authentication status
  setAuthenticated(status: boolean): void {
    // Update local storage
    localStorage.setItem(this.AUTH_STORAGE_KEY, String(status));
    this.isAuthenticatedSubject.next(status);
  }

  // Method to check authentication status from local storage
  private isAuthenticatedInStorage(): boolean {
    const storedValue = localStorage.getItem(this.AUTH_STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : false;
  }
}
