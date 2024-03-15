import { Component, OnInit } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { VideocallService } from './core/services/videocall.service';
import { MatDialog } from '@angular/material/dialog';
import { IncomingcallmodalComponent } from './shared/incomingcallmodal/incomingcallmodal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationAnswer, InvitationReject, InvitationResponse, answer, offerResponse } from './core/models/interfaces';
import { WebrtcService } from './core/services/webrtc.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(private videoCallService: VideocallService, private dialogRef: MatDialog, private router: Router, private webrtc: WebrtcService) {

  }
  ngOnInit() {
    this.webrtc.createPeerConnection()
    const currentUserId = localStorage.getItem('currentUserId')
    this.videoCallService.incomingInvitation().subscribe((data: InvitationResponse) => {
      console.log(data)
      if (data.invitationReceiver._id === currentUserId) {
        this.openIncomingModal(data)
      }
    })
  }

  openIncomingModal(data: InvitationResponse) {
    const dialogRef = this.dialogRef.open(IncomingcallmodalComponent, {
      data: data,
      disableClose: true
    })
    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        const datas = {
          answerer: data.invitationReceiver,
          receiver: data.invitationSender
        }
        this.videoCallService.acceptInvite(datas)
        this.router.navigate([`video/${data.invitationSender._id}`])
      } else {
        const datas = {
          rejecter: data.invitationReceiver,
          receiver: data.invitationSender
        }
        this.videoCallService.rejectInvite(datas)
        console.log("call-Rejected")
      }
    })
  }
}
