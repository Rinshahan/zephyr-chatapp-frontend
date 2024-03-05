import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideocallService {
  socket: Socket
  isCalling: boolean = false

  constructor(private chatService: ChatService) {
    this.socket = this.chatService.socket
  }
  initiateCall(data) {
    this.socket.emit('initiate-call', data)
  }

  sendAnswer(answer: RTCSessionDescription) {
    this.socket.emit('answer-call', answer)
  }

  sendIceCandidate(candidate: RTCSessionDescription) {
    this.socket.emit('ice-candidate', candidate)
  }

  // methods for incoming call 

  onIncomingCall() {
    this.socket.on("incoming-call", (data) => {
      console.log(data)
    })
  }

}
