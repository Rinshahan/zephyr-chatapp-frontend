import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class VideocallService {
  socket: Socket
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

  onIncomingCall(callback: (offer: RTCSessionDescription) => void) {
    this.socket.on("incoming-call", callback)
  }

  onAnswerRecieved(callback: (offer: RTCSessionDescription) => void) {
    this.socket.emit("answer-recieved", callback)
  }

  onIceCandidate(callback: (offer: RTCIceCandidate) => void) {
    this.socket.emit("ice-candidate", callback)
  }
}
