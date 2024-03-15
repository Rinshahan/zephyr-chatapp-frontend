import { Injectable } from '@angular/core';
import { VideocallService } from './videocall.service';
import { Offer, answer } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peerConnection: RTCPeerConnection
  constructor(private videoCallService: VideocallService) { }

  createPeerConnection() {
    try {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun1.l.google.com:19302'] }]
      })

    } catch (error) {
      console.log('Error creating peer connection : ', error)
    }
  }

  // send ice candidate
  async sendIceCandidate(sender, reciever) {
    try {
      this.peerConnection.onicecandidate = (event) => {
        const datas = {
          sender: sender,
          reciever: reciever,
          candidate: event.candidate
        }
        this.videoCallService.sendIceCandidate(datas)
      }
    } catch (error) {
      console.log(`Error sending ice candidate`, error)
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

  async createOffer(data?: Offer): Promise<RTCSessionDescriptionInit | null> {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer)
      if (data) {
        this.videoCallService.initiateCall(data)
      }
      return offer
    } catch (error) {
      console.log('error creating offer', error)
      return null
    }
  }

  async createAnswer(data?: answer): Promise<RTCSessionDescriptionInit | null> {
    if (this.peerConnection) {
      const answer = await this.peerConnection.createAnswer()
      await this.peerConnection.setLocalDescription(answer)
      if (data) {
        this.videoCallService.callMade(data)
      }
      return answer
    } else {
      console.log('error creating answer')
      return null
    }
  }

  async setRemoteDescription(description: RTCSessionDescriptionInit) {
    if (this.peerConnection) {
      try {
        await this.peerConnection.setRemoteDescription(description)
      } catch (error) {
        console.log(`Error setting remote description`, error)
      }
    }
  }
}
