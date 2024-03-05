import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  constructor(private activatedRoute: ActivatedRoute, private VideocallService: VideocallService, private userService: UserService) { }
  ngOnInit(): void {
    this.selectedUser = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getAUser(this.selectedUser).subscribe((res) => {
      this.user = res
    })
    this.startVideoCall()
  }

  async startVideoCall() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
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
          this.VideocallService
        }
      }

      // create offer and initiate the call
      const offer = await this.peerConnection.createOffer()
      await this.peerConnection.setLocalDescription(offer)

      const data: Offer = {
        offer: offer,
        roomId: this.roomId
      }
      this.VideocallService.initiateCall(data)
    } catch (error) {
      console.log(error)
    }
  }




}