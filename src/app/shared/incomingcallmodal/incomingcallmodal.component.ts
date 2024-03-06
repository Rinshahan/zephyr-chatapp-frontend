import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incomingcallmodal',
  templateUrl: './incomingcallmodal.component.html',
  styleUrls: ['./incomingcallmodal.component.css']
})
export class IncomingcallmodalComponent {
  constructor(public dialogRef: MatDialogRef<IncomingcallmodalComponent>) { }

  acceptCall() {
    this.dialogRef.close(true)
  }
  rejectCall() {
    this.dialogRef.close(false)
  }
}
