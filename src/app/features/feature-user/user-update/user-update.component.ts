
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAPI } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserDeleteConfirmComponent } from 'src/app/shared/user-delete-confirm/user-delete-confirm.component';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  userData: UserAPI;
  currentUserId: string
  image: File
  updateForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  });
  constructor(private userService: UserService, private Toast: ToastrService, private location: Location, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private dialogRef: MatDialog, private router: Router) {
    this.userData = {
      status, data: {
        username: '',
        email: '',
        phone: '',
        password: '',
        image: ''
      }
    }
  }
  ngOnInit(): void {
    this.currentUserId = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getAUser(this.currentUserId).subscribe((data) => {
      this.userData = data
      this.initForm()
    })
  }

  get username(): string {
    return this.userData?.data?.username || '';
  }

  get email(): string {
    return this.userData?.data?.email || '';
  }

  get phone(): string {
    return this.userData?.data?.phone?.toString() || '';
  }

  initForm(): void {
    this.updateForm = this.formBuilder.group({
      username: [this.username],
      email: [this.email],
      phone: [this.phone]
    })
  }

  onUpdate() {
    const updatedUser = {
      username: this.updateForm.value.username,
      email: this.updateForm.value.email,
      phone: this.updateForm.value.phone
    }

    this.userService.updateUser(this.currentUserId, updatedUser, this.image).subscribe(response => {
      console.log(response);
      this.Toast.success("Profile updated successfully!")
      location.reload()
    }, (err) => {
      console.log(err);
      this.Toast.success("Error Updating Profile! Please Try Again")
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.image = file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.updateForm.patchValue({
          image: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onDeactivateAccount() {
    this.openDeleteConfirmModal()
  }

  openDeleteConfirmModal() {
    const dialogRef = this.dialogRef.open(UserDeleteConfirmComponent, {
      disableClose: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.userService.deleteUser(this.currentUserId).subscribe((data) => {
          console.log(data);
          this.router.navigate(['/login'])
          this.Toast.warning("Account Deleted!")
        }, (err) => {
          console.log(err);
        })
      } else {
        this.Toast.info("Profile Deletion Cancelled")
      }
    })
  }
}
