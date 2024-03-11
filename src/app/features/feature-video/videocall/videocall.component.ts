import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/core/models/interfaces';
import { UserAPI } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { VideocallService } from 'src/app/core/services/videocall.service';
import { WebrtcService } from 'src/app/core/services/webrtc.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})

export class VideocallComponent implements OnInit {
  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>
  selectedUser: string
  localStream: MediaStream
  roomId: string = 'room1'
  peerConnection: RTCPeerConnection
  user: UserAPI
  isCalling: boolean
  currentUserId: string
  constructor(
    private activatedRoute: ActivatedRoute,
    private VideocallService: VideocallService,
    private userService: UserService,
    private dialog: MatDialog,
    private webrtc: WebrtcService) {
    this.isCalling = this.VideocallService.isCalling
  }



  ngOnInit(): void {
    this.webrtc.createPeerConnection()
    this.selectedUser = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getAUser(this.selectedUser).subscribe((res) => {
      this.user = res
    })
    this.currentUserId = localStorage.getItem("currentUserId")
    this.setupWebRtc()
    this.dialog
  }

  async setupWebRtc() {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.localStream = stream
      this.localVideo.nativeElement.srcObject = this.localStream
      this.localVideo.nativeElement.play()


      // add local stream to peer connection
      // this.localStream.getTracks().forEach(track => {
      //   this.peerConnection.addTrack(track, this.localStream)
      // })

      // add ice candidates
      this.VideocallService.recieverIceCandidate().subscribe((candidate) => {
        this.webrtc.addIceCandidate(candidate)
      })

    } catch (error) {
      console.log(error)
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        console.error("Permissions for camera and microphone is denied")
      }
    }
  }

  async initiateCall() {
    try {
      const offer = await this.webrtc.createOffer()
      const data: Offer = {
        offer: offer,
        roomId: this.roomId,
        caller: this.currentUserId,
        reciever: this.selectedUser
      }
      this.VideocallService.initiateCall(data)
    } catch (error) {
      console.log('Error making call : ', error)
    }
  }


  async acceptOffer() {
    const answer = await this.webrtc.createAnswer()
    const data = {
      answerer: this.currentUserId,
      receiver: this.selectedUser,
      answer: answer
    }
    this.VideocallService.callMade(data)
  }
}
