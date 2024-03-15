import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, defaultUrlMatcher } from '@angular/router';
import { Offer, answer, answerResponse, candidateOffer, sendCandidate } from 'src/app/core/models/interfaces';
import { UserAPI } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserService } from 'src/app/core/services/user.service';
import { VideocallService } from 'src/app/core/services/videocall.service';
import { WebrtcService } from 'src/app/core/services/webrtc.service';

const mediaConstraints = {
  audio: true,
  video: true
};

const offerOption = {
  offerToRecieveAudio: true,
  offerToRecieveVideo: true
}

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.css']
})



export class VideocallComponent implements OnInit, AfterViewInit {
  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>
  selectedUser: string
  localStream: MediaStream
  roomId: string = 'room1'
  peerConnection: RTCPeerConnection
  user: UserAPI
  isCalling: boolean
  currentUserId: string
  isLocalVideoOn: boolean = true;
  isLocalAudioOn: boolean = true
  constructor(
    private activatedRoute: ActivatedRoute,
    private VideocallService: VideocallService,
    private userService: UserService,
    private dialog: MatDialog,
    private chatService: ChatService) {
    this.isCalling = this.VideocallService.isCalling
  }

  toggleLocalVideo(): void {
    const videoTracks = this.localStream.getVideoTracks();
    if (videoTracks.length === 0) {
      console.log('No local video available.');
      return;
    }
    videoTracks[0].enabled = !videoTracks[0].enabled;
    this.isLocalVideoOn = videoTracks[0].enabled;
  }

  toggleLocalAudio(): void {
    this.isLocalAudioOn = !this.isLocalAudioOn;
    this.localStream.getAudioTracks().forEach(track => {
      track.enabled = this.isLocalAudioOn;
    });
  }

  ngAfterViewInit(): void {
    this.requestMediaDevices()
    this.addIncomingCallHandler()
    if (!this.peerConnection) {
      this.createPeerConnection()
      this.VideocallService.onIncomingCall().subscribe((data) => {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer))
        this.answer()
      })
      this.VideocallService.recieverIceCandidate().subscribe((data) => {
        console.log(data);
        this.peerConnection.addIceCandidate(data.candidate)
      })
    }
  }


  ngOnInit(): void {
    this.selectedUser = this.activatedRoute.snapshot.paramMap.get('id')
    this.userService.getAUser(this.selectedUser).subscribe((res) => {
      this.user = res
    })
    this.currentUserId = localStorage.getItem("currentUserId")
    this.chatService.joinRoom(this.roomId)


  }

  private async answer() {
    const answer = await this.peerConnection.createAnswer()
    this.peerConnection.setLocalDescription(answer)
    const data = {
      roomId: this.roomId,
      answerer: this.currentUserId,
      reciever: this.selectedUser,
      answer: answer
    }
    this.VideocallService.callMade(data)
  }

  private async requestMediaDevices(): Promise<void> {
    this.localStream = await navigator.mediaDevices.getUserMedia(mediaConstraints)
    this.localVideo.nativeElement.srcObject = this.localStream
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream)
    })
  }


  pauseLocalVideo(): void {
    this.localStream.getTracks().forEach(tracks => {
      tracks.enabled = false
    });
    this.localVideo.nativeElement.srcObject = undefined
  }

  startLocalVideo(): void {
    this.localStream.getTracks().forEach(tracks => {
      tracks.enabled = true
    });
    this.localVideo.nativeElement.srcObject = this.localStream
  }

  private createPeerConnection(): void {
    var iceServerConfig = {
      iceServers: [{
        urls: ["stun:bturn1.xirsys1221.com"]
      }, {
        username: "9hiaOVYRRn31s_Lv2sGS-iGgtEKg5_3SVWfeEZyO-4GWtKxUv0sCxQVNGkxlk-zBAAAAAF0sGiFhamF5cGF0aWw=",
        credential: "04f626c0-a6c8-11e9-8ad1-26d3ed601a80",
        urls: [
          "turn:bturn1.xirsys.com:80?transport=udp",
          "turn:bturn1.xirsys.com:3478?transport=udp",
          "turn:bturn1.xirsys.com:80?transport=tcp",
          "turn:bturn1.xirsys.com:3478?transport=tcp",
          "turns:bturn1.xirsys.com:443?transport=tcp",
          "turns:bturn1.xirsys.com:5349?transport=tcp"
        ]
      }]
    }
    this.peerConnection = new RTCPeerConnection(iceServerConfig);

    this.peerConnection.onicecandidate = this.handleICECandidateEvent
    this.peerConnection.onicegatheringstatechange = this.handleICEConnectionStateChangeEvent
    this.peerConnection.onsignalingstatechange = this.handleSignalingStateEvent
    this.peerConnection.ontrack = this.handleTrackEvent
  }

  HangUpVideoCall(): void {
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = null
      this.peerConnection.onicegatheringstatechange = null
      this.peerConnection.onsignalingstatechange = null
      this.peerConnection.ontrack = null
    }
    this.peerConnection.getTransceivers().forEach(transciever => {
      transciever.stop()
    });

    this.peerConnection.close()
    this.peerConnection = null
  }

  async InitiateCall(): Promise<void> {
    this.createPeerConnection()
    this.localStream.getTracks().forEach(track => {
      this.peerConnection.addTrack(track, this.localStream)
    })
    try {
      const offer: RTCSessionDescriptionInit = await this.peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
      await this.peerConnection.setLocalDescription(offer)
      const data: Offer = {
        offer: offer,
        roomId: this.roomId,
        caller: this.currentUserId,
        reciever: this.selectedUser
      }
      this.VideocallService.initiateCall(data)
    } catch (error) {
      this.handleGetUserMediaError(error)
    }
  }

  private handleGetUserMediaError(err: Error): void {
    switch (err.name) {
      case 'NotFoundError':
        alert('unable to open your call because no camera or microphone')
        break;
      case 'SecurityError':
      case 'PermissionDeniedError':
        // Do nothing 
        break;
      default:
        console.log(err)
        alert(`Error opening your camera : ${err.name}`)
        break
    }
    this.HangUpVideoCall()
  }

  private handleICECandidateEvent = (event: RTCPeerConnectionIceEvent) => {
    console.log(event)
    if (event.candidate) {
      const data = {
        roomId: this.roomId,
        sender: this.currentUserId,
        reciever: this.selectedUser,
        candidate: event.candidate
      }
      this.VideocallService.sendIceCandidate(data)
    }
  }

  private handleICEConnectionStateChangeEvent = (event: Event) => {
    console.log(event);
    switch (this.peerConnection.iceConnectionState) {
      case 'closed':
      case 'failed':
      case 'disconnected':
        this.HangUpVideoCall()
        break;
    }
  }

  private handleSignalingStateEvent = (event: Event) => {
    console.log(event)
    switch (this.peerConnection.signalingState) {
      case 'closed':
        this.HangUpVideoCall()
        break;
    }
  }

  private handleTrackEvent = (event: RTCTrackEvent) => {
    console.log(event);
    this.remoteVideo.nativeElement.srcObject = event.streams[0];
  }

  private addIncomingCallHandler() {
    this.VideocallService.afterCallMade().subscribe(data => {
      console.log(data);

      switch (data.answer.type) {
        case 'answer':
          this.handleAnswerCall(data)
          break
        default:
          console.log('uknown')
      }
    }, (err) => {
      console.log(err)
    })
  }

  private handleAnswerCall(data: answerResponse) {
    if (!this.peerConnection) {
      this.createPeerConnection()
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        if (!this.peerConnection.getSenders().find(sender => sender.track === track)) {
          console.log("hai");

          this.peerConnection.addTrack(track, this.localStream);
        }
      });
    } else {
      console.log(`Local stream is not avaialable`)
    }



    // this.localVideo.nativeElement.srcObject = this.localStream
    // this.localStream.getTracks().forEach(track => {
    //   this.peerConnection.addTrack(track, this.localStream)
    // })
    this.localStream.getTracks().forEach(track => {
      if (!this.peerConnection.getSenders().find(sender => sender.track === track)) {
        console.log("hai");

        this.peerConnection.addTrack(track, this.localStream);
      }
    });

    this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer))

    this.localVideo.nativeElement.srcObject = this.localStream

  }


}
