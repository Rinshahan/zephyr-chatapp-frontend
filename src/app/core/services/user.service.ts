import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/apis.model';
import { User, UserAPI } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>('https://zephyrchat.site/api/user/')
  }
  getAUser(userId): Observable<UserAPI> {
    return this.http.get<UserAPI>(`https://zephyrchat.site/api/user/${userId}`)
  }

  updateUser(userId, body, image: File): Observable<UserAPI> {

    const formData: FormData = new FormData()
    formData.append('username', body.username)
    formData.append('email', body.email)
    formData.append('phone', body.phone)
    formData.append('image', image)
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data')
    return this.http.patch<UserAPI>(`https://zephyrchat.site/api/user/${userId}`, formData, { headers })
  }

  deleteUser(userId: string) {
    return this.http.delete(`https://zephyrchat.site/api/user/${userId}`)
  }
}
