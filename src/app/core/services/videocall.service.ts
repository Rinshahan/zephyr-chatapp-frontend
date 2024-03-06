import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

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

  sendIceCandidate(candidate: RTCIceCandidate) {
    this.socket.emit('ice-candidate', candidate);
  }

  // methods for incoming call 

  onIncomingCall(): Observable<RTCSessionDescription> {
    return new Observable(subscriber => {
      this.socket.on("incoming-call", (data) => {
        subscriber.next(data)
      });
    });
  }

  // method for handling answer call

}
