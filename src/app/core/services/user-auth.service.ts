import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import UserLogin from '../models/userLogin.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  userLogin(userLoginData): Observable<UserLogin> {
    console.log(userLoginData);
    return this.http.post<UserLogin>('http://zephyrchat.site:4000/api/user/login', userLoginData)
  }

  userSignUp(userData, image: File) {
    console.log(userData, image);
    const formData: FormData = new FormData()
    formData.append('username', userData.username.toString())
    formData.append('email', userData.email.toString())
    formData.append('phone', userData.phone.toString())
    formData.append('password', userData.password.toString())
    formData.append('image', image)
    const headers = new HttpHeaders()
    return this.http.post(`http://localhost:4000/api/user/register`, formData, { headers })
  }

  userLogout() {
    localStorage.removeItem('currentUserId')
    localStorage.removeItem('token')
  }

  userOtpLogin(phoneNum: string): Observable<any> {
    const phoneNumber: string = `+91${phoneNum}`
    return this.http.post<any>("http://localhost:4000/api/user/sendOtp", { phoneNumber })
  }

  verifyOtp(otp: string): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:4000/api/user/verifyOtp', { otp })
  }
}
