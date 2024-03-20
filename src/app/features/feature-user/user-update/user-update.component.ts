
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAPI } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { UserDeleteConfirmComponent } from 'src/app/shared/user-delete-confirm/user-delete-confirm.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  userData: UserAPI;
  currentUserId: string
  image: File
  updateForm: FormGroup<any>;

  reactiveForm: FormGroup<any>;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private dialogRef: MatDialog, private router: Router) { }
  ngOnInit(): void {
    this.currentUserId = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.currentUserId);

    this.userService.getAUser(this.currentUserId).subscribe((data) => {
      this.userData = data
      this.initForm()
    })
  }

  initForm(): void {
    this.updateForm = this.formBuilder.group({
      username: [this.userData.data.username],
      email: [this.userData.data.email],
      phone: [this.userData.data.phone.toString()],
      image: ['']
    })
  }

  onUpdate() {
    const updatedUser = this.updateForm.value
    this.userService.updateUser(this.currentUserId, updatedUser, this.image).subscribe(response => {
      console.log(response);
    }, (err) => {
      console.log(err);
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
        }, (err) => {
          console.log(err);
        })
      } else {
        console.log("canceled")
      }
    })
  }
}