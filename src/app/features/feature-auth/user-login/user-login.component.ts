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
  @ViewChild('loginForm') form: NgForm;
  @ViewChild('phoneNumberForm') phoneNumber: NgForm
  @ViewChild('otpVerificationForm') otpForm: NgForm
  userLoginData: UserLogin;
  selectedMethod: string = 'email'; // Default selected method is email
  otpSent: boolean = false;

  phoneNumberInvalid: boolean = false;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  onFormSubmitted() {
    this.userLoginData = this.form.value;
    this.userAuthService.userLogin(this.userLoginData).subscribe((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUserId', res.user._id);
      this.router.navigate(['/chatpage']);
    }, (err) => {
      console.log(err.error.message);
    });
  }

  selectLoginMethod(method: string) {
    this.selectedMethod = method;
    this.resetOTP();
  }

  sendOTP() {
    const phoneNumber = this.phoneNumber.value.phoneNumber
    console.log(phoneNumber);
    this.userAuthService.userOtpLogin(phoneNumber).subscribe((res) => {
      console.log(res);
      this.otpSent = true;
    }, (err) => {
      console.log(err)
    })
  }

  verifyOTP() {
    const otp: string = this.otpForm.value.otpCode
    // Here you would verify the entered OTP
    this.userAuthService.verifyOtp(otp).subscribe((res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('currentUserId', res.user._id);
      this.router.navigate(['/chatpage']);
    }, (err) => {
      console.log(err);
    })
    // Upon successful verification, you can proceed with login
    // For demonstration purposes, let's reset the state
    this.resetOTP();
  }

  private resetOTP() {
    this.otpSent = false;
    this.phoneNumberInvalid = false;
  }
}
