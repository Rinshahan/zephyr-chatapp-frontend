import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, from } from 'rxjs';
import { ChatResponse, ChatSocket } from 'src/app/core/models/apis.model';
import { Invitation, Offer, offerResponse } from 'src/app/core/models/interfaces';
import { User, UserAPI } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { UserService } from 'src/app/core/services/user.service';
import { VideocallService } from 'src/app/core/services/videocall.service';
import { WebrtcService } from 'src/app/core/services/webrtc.service';
import { IncomingcallmodalComponent } from 'src/app/shared/incomingcallmodal/incomingcallmodal.component';
import { WaitinguseracceptanceComponent } from 'src/app/shared/waitinguseracceptance/waitinguseracceptance.component';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @Input('messageForm') form: NgForm
  public selectedUserId: string
  public currentUserId: string
  public roomId: string = 'room 1'
  public messageArray: ChatSocket[]
  public user: UserAPI
  constructor(
    private videoService: VideocallService,
    private chatService: ChatService,
    private sharedService: SharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private webrtc: WebrtcService,
  ) {
  }

  ngOnInit(): void {
    this.selectedUserId = this.activatedRoute.snapshot.paramMap.get("id")
    this.currentUserId = localStorage.getItem('currentUserId')
    this.messageArray = []
    this.sharedService.selectedUserId$.subscribe(userId => {
      this.selectedUserId = userId
      // get User details api calls
      this.userService.getAUser(this.selectedUserId).subscribe((res) => {
        this.user = res
      }, (err) => {
        console.log(err)
      })
      // load initial messages api calls
      this.chatService.getMessages(userId).subscribe((res) => {
        if (res) {
          this.messageArray = res.message
        } else {
          this.messageArray = []
        }
      }, (err) => {
        console.log(err)
      })
      this.chatService.joinRoom(this.roomId)
    })

    this.chatService.recieveMessage().subscribe((res) => {
      //console.log(res)
      this.messageArray.push(res)
    })


    this.videoService.outGoingCallState().subscribe(isCalling => {
      if (isCalling) {
        this.openOutGoingModal()
      } else {
        this.closeOutGoingModal()
      }
    })

    this.videoService.incomingInviteAnswer().subscribe((data) => {
      if (data.AnswerReceiver._id === this.currentUserId && data.inviteAnswerer._id === this.selectedUserId) {
        window.alert(`${data.inviteAnswerer.username} Accepted You Invite`)
        this.router.navigate([`/video/${this.selectedUserId}`])
      }
    })

    this.videoService.incomingInviteReject().subscribe((data) => {
      if (data.rejectReciever._id === this.currentUserId && data.inviteRejecter._id === this.selectedUserId) {
        window.alert(`${data.inviteRejecter.username} Rejected Your Invite`)
      }
    })

  }

  sendMessage(form: NgForm) {
    const data = {
      message: form.value.message,
      sender: this.currentUserId,
      reciever: this.selectedUserId,
      room: this.roomId
    }
    this.chatService.sendMessages(data)
    form.reset()
  }

  videoCall() {
    const invitationData: Invitation = {
      invitationSender: this.currentUserId,
      invitationReceiver: this.selectedUserId
    }
    this.videoService.sendInvitation(invitationData)
  }


  openOutGoingModal() {
    const dialogRef = this.dialog.open(WaitinguseracceptanceComponent, {
    })
  }

  closeOutGoingModal() {
    this.dialog.closeAll()
  }



}
