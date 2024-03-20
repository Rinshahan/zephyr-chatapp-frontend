import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  userChangePassword(userId, prevPassword, newPassword) {
    const passwords = {
      prevPassword,
      newPassword
    }
    return this.http.patch(`http://localhost:4000/api/user/changepassword/${userId}`, passwords)
  }
}
