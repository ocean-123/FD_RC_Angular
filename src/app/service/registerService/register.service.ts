import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8848/api/check/auth'; // Replace with your actual API URL
  private imageUploadUrl = 'http://localhost:8848/upload/upload-image';

  constructor(private http: HttpClient) { }

  registerUser(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }



  uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(this.imageUploadUrl, formData, { responseType: 'text' });
  }
}