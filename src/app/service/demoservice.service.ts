import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoserviceService {
  private userRoleSubject = new BehaviorSubject<'DONOR' | 'RECEIVER' | 'DELIVERY_PERSON' | 'ADMIN'>('RECEIVER');
  userRole$ = this.userRoleSubject.asObservable();

  setUserRole(role: 'DONOR' | 'RECEIVER' | 'DELIVERY_PERSON' | 'ADMIN') {
    this.userRoleSubject.next(role);
  }
}