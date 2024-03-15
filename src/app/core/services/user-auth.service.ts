import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserLogin from '../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  userLogin(userLoginData): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:4000/api/user/login', userLoginData)
  }
}
