import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import UserLogin from 'src/app/core/models/userLogin.model';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  @ViewChild('loginForm') form: NgForm
  userLoginData: UserLogin
  constructor(private userAuthService: UserAuthService, private router: Router) { }

  onFormSubmitted() {
    this.userLoginData = this.form.value
    this.userAuthService.userLogin(this.userLoginData).subscribe((res) => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('currentUserId', res.user._id)
      this.router.navigate(['/chatpage'])
    }, (err) => {
      console.log(err.error.message);
    })
  }
}
