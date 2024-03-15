import { HttpClient } from '@angular/common/http';
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
    return this.http.get<UserResponse>('http://localhost:4000/api/user/')
  }
  getAUser(userId): Observable<UserAPI> {
    return this.http.get<UserAPI>(`http://localhost:4000/api/user/${userId}`)
  }
}
