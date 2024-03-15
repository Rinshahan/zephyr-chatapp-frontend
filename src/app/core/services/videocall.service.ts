import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';
import { Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { Invitation, InvitationAnswer, InvitationReject, InvitationResponse, answerResponse, candidateOffer, offerResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class VideocallService {
  socket: Socket
  isCalling: boolean = false
  private outGoingSubject: Subject<boolean> = new Subject<boolean>()
  constructor(private chatService: ChatService) {
    this.socket = this.chatService.socket
  }
  // send invitation
  sendInvitation(invitationData: Invitation): void {
    this.socket.emit("send-invitation", invitationData)
    this.isCalling = true
    this.outGoingSubject.next(this.isCalling)
  }

  outGoingCallState(): Observable<boolean> {
    return this.outGoingSubject.asObservable()
  }

  //incoming call invitation
  incomingInvitation(): Observable<InvitationResponse> {
    return new Observable<InvitationResponse>(observer => {
      this.socket.on("incoming-invitation", (data: InvitationResponse) => {
        observer.next(data)
      })
    })
  }



  initiateCall(data) {
    this.socket.emit('initiate-call', data)
  }
  // send ice candidate
  sendIceCandidate(datas) {
    this.socket.emit('ice-candidate', datas);
  }

  // Recieve ice Candidate
  recieverIceCandidate() {
    return new Observable<candidateOffer>(observer => {
      this.socket.on("ice-candidate", (candidate) => {

        observer.next(candidate)
      })
    })
  }

  // methods for incoming call 

  onIncomingCall(): Observable<offerResponse> {
    return new Observable<offerResponse>(observer => {
      this.socket.on("incoming-call", (data) => {
        observer.next(data)
      });
    });
  }
  // accept invite
  acceptInvite(datas): void {
    this.socket.emit("accept-invite", datas)
  }
  //handling the answer of sended invitation
  incomingInviteAnswer(): Observable<InvitationAnswer> {
    return new Observable<InvitationAnswer>(observer => {
      this.socket.on("accept-invite", (data) => {
        this.isCalling = false
        this.outGoingSubject.next(this.isCalling)
        observer.next(data)
      })
    })
  }

  // handling the reject of sended invitation
  incomingInviteReject(): Observable<InvitationReject> {
    return new Observable<InvitationReject>(observer => {
      this.socket.on("reject-invite", (data) => {
        this.isCalling = false
        this.outGoingSubject.next(this.isCalling)
        observer.next(data)
      })
    })
  }


  // reject invite
  rejectInvite(data) {
    this.socket.emit("reject-invite", data)
  }
  // method for handling answer call
  callMade(answer) {
    this.socket.emit("answer-made", answer)
  }

  // method for after user made the answer (listens for the answer)
  afterCallMade(): Observable<answerResponse> {
    return new Observable<answerResponse>(observer => {
      this.socket.on("answer-made", (data) => {
        observer.next(data)
      })
    })
  }
}
