import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-confirm',
  templateUrl: './user-delete-confirm.component.html',
  styleUrls: ['./user-delete-confirm.component.css']
})
export class UserDeleteConfirmComponent {
  constructor(public dialogRef: MatDialogRef<UserDeleteConfirmComponent>) {

  }

  cancel() {
    this.dialogRef.close(false)
  }
  confirm() {
    this.dialogRef.close(true)
  }

}
