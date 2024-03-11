import { Injectable } from '@angular/core';
import { VideocallService } from './videocall.service';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peerConnection: RTCPeerConnection
  constructor(private videoCallService: VideocallService) { }

  async createPeerConnection() {
    try {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun.l.google.com:19302', 'stun:stun1.1.google.com:19302'] }]
      })

      // send ice candidate
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.videoCallService.sendIceCandidate(event.candidate)
        }
      }
    } catch (error) {
      console.log('Error creating peer connection : ', error)
    }
  }

  // add incoming ice candidate
  async addIceCandidate(candidate: RTCIceCandidate) {
    if (this.peerConnection) {
      try {
        this.peerConnection.addIceCandidate(candidate)
      } catch (error) {
        console.log('Error adding Ice candidate : ', error)
      }
    }
  }

  // create offer fn

  async createOffer(): Promise<RTCSessionDescriptionInit | null> {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer)
      return offer
    } catch (error) {
      console.log('error creating offer', error)
      return null
    }
  }

  async createAnswer(): Promise<RTCSessionDescriptionInit | null> {
    if (this.peerConnection) {
      const answer = await this.peerConnection.createAnswer()
      await this.peerConnection.setLocalDescription(answer)
      return answer
    } else {
      console.log('error creating answer')
      return null
    }
  }

  async setRemoteDescription(description: RTCSessionDescription) {
    if (this.peerConnection) {
      try {
        await this.peerConnection.setRemoteDescription(description)
      } catch (error) {
        console.log(`Error setting remote description`, error)
      }
    }
  }
}
