import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChatResponse, ChatSocket } from '../models/apis.model';
import io, { Socket } from "socket.io-client"
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  socket: Socket
  private messageSubject = new Subject<ChatSocket>()
  constructor(private http: HttpClient) {
    this.socket = io("http://localhost:3000")
  }

  joinRoom(roomId: string) {
    this.socket.emit("join-room", { roomId })
  }

  sendMessages(sender: string, userToChatId: string, message: string, roomId: string): void {
    this.socket.emit("send-message", { sender: sender, reciever: userToChatId, message, room: roomId })
    //return this.http.post<ChatResponse>(`http://localhost:3000/api/messages/send/${userToChatId}`, { message })
  }

  getMessages(userToChatId: string) {
    return this.http.get<ChatResponse>(`http://localhost:3000/api/messages/${userToChatId}`)
  }




  subscribeToMessage(): Observable<ChatSocket> {
    this.socket.on("new-message", (data) => {
      console.log(data.message)
      this.messageSubject.next(data)
    })
    return this.messageSubject.asObservable()
  }

  unSubscribeFromMessages(): void {
    this.socket.off("new-message")
  }


}
