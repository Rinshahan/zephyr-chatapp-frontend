import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent {
  @ViewChild('passwordResetForm') resetForm: NgForm
  constructor(private passwordService: PasswordService, private activatedRoute: ActivatedRoute) { }

  resetPassword() {
    const currentPassword = this.resetForm.value.currentPassword
    const newPassword = this.resetForm.value.newPassword
    const userId = this.activatedRoute.snapshot.paramMap.get('id')
    this.passwordService.userChangePassword(userId, currentPassword, newPassword).subscribe((response) => {
      console.log(response);
    }, (err) => {
      console.log(err);
    })
    this.resetForm.reset()
  }


}
