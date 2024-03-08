import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/app/core/models/interfaces';
import { UserAPI } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { VideocallService } from 'src/app/core/services/videocall.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private VideocallService: VideocallService,
    private userService: UserService,
    private dialog: MatDialog) {
    this.isCalling = this.VideocallService.isCalling
  }



  ngOnInit(): void {
    this.selectedUser = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getAUser(this.selectedUser).subscribe((res) => {
      this.user = res
    })
    this.startVideoCall()
  }

  async startVideoCall() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.localStream = stream
      this.localVideo.nativeElement.srcObject = this.localStream
      this.localVideo.nativeElement.play()

      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.1.google.com:19302'] }]
      })
      // add local stream to peer connection
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream)
      })

      // handle ice candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.VideocallService.sendIceCandidate(event.candidate)
        }
      }

      // create offer and initiate the call
      const offer = await this.peerConnection.createOffer()
      await this.peerConnection.setLocalDescription(offer)
      this.isCalling = true
      const data: Offer = {
        offer: offer,
        roomId: this.roomId
      }
      this.VideocallService.initiateCall(data)
    } catch (error) {
      console.log(error)
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        console.error("Permissions for camera and microphone is denied")
      }
    }
  }

  async acceptCall(data: RTCSessionDescription) {
    try {
      const answer = await this.peerConnection.createAnswer()
      await this.peerConnection.setLocalDescription(answer)
    } catch (error) {
      console.log(error)
    }
  }
}
