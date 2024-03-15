import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  reactiveForm: FormGroup;

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.email, Validators.required]),
      phone: new FormControl(null, Validators.required),
      image: new FormControl(null),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  onFormSubmitted() {
    console.log(this.reactiveForm.value);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }
}
