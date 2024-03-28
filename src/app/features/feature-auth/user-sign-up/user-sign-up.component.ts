import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './user-sign-up.component.html',
  styleUrls: ['./user-sign-up.component.css']
})
export class UserSignUpComponent implements OnInit {
  reactiveForm: FormGroup;
  image: File;

  constructor(private userAuth: UserAuthService, private router: Router, private Toast: ToastrService) {

  }

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
    const userData = {
      username: this.reactiveForm.value.username,
      email: this.reactiveForm.value.email,
      phone: `+91${this.reactiveForm.value.phone}`,
      password: this.reactiveForm.value.confirmPassword
    }
    this.userAuth.userSignUp(userData, this.image).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/login'])
      this.Toast.success("Account Creation Succesfull")
    }, (err) => {
      console.log(err);
      this.Toast.error("Something Went Wrong!!!")
    })

    this.reactiveForm.reset()
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      this.image = file
    }
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
