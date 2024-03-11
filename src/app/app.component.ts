import { Component, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { VideocallService } from './core/services/videocall.service';
import { MatDialog } from '@angular/material/dialog';
import { IncomingcallmodalComponent } from './shared/incomingcallmodal/incomingcallmodal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { offerResponse } from './core/models/interfaces';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private videoCallService: VideocallService, private dialogRef: MatDialog, private router: Router) {

  }
  ngOnInit(): void {
    const currentUserId = localStorage.getItem('currentUserId')
    this.videoCallService.onIncomingCall().subscribe((data) => {
      console.log(data)
      if (data.reciever._id === currentUserId) {
        this.openIncomingModal(data)
      }
    })
  }

  openIncomingModal(data: offerResponse) {
    const dialogRef = this.dialogRef.open(IncomingcallmodalComponent, {
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log("call accepted")
        this.router.navigate([`video/${data.caller._id}`])
      } else {
        console.log("call-Rejected")
      }
    })
  }
}
