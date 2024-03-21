import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserAuthService } from 'src/app/core/services/user-auth.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent {
  @ViewChild('passwordResetForm') resetForm: NgForm
  constructor(private passwordService: PasswordService, private activatedRoute: ActivatedRoute, private router: Router, private sharedService: SharedService, private userAuth: UserAuthService) { }

  resetPassword() {
    const currentPassword = this.resetForm.value.currentPassword
    const newPassword = this.resetForm.value.newPassword
    const userId = this.activatedRoute.snapshot.paramMap.get('id')
    this.passwordService.userChangePassword(userId, currentPassword, newPassword).subscribe((response) => {
      console.log(response);
      this.sharedService.setSelectedUserId(null)
      this.userAuth.userLogout()
      this.router.navigate(['/login'])
    }, (err) => {
      console.log(err);
    })
    this.resetForm.reset()
  }


}
