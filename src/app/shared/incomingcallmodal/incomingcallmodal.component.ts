import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer, offerResponse } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-incomingcallmodal',
  templateUrl: './incomingcallmodal.component.html',
  styleUrls: ['./incomingcallmodal.component.css']
})
export class IncomingcallmodalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<IncomingcallmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: offerResponse
  ) { }
  ngOnInit(): void {

  }
  acceptCall() {
    this.dialogRef.close(true)
  }
  rejectCall() {
    this.dialogRef.close(false)
  }
}
