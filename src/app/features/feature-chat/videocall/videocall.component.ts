import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.selectedUser = this.activatedRoute.snapshot.paramMap.get('id')
    this.startVideoCall()
  }

  async startVideoCall() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      this.localVideo.nativeElement.srcObject = this.localStream
      this.localVideo.nativeElement.play()
    } catch (error) {
      console.log(error)
    }
  }
}
