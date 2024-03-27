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
  constructor(private http: HttpClient) {
    this.socket = io("https://zephyrchat.site")
  }

  joinRoom(roomId) {
    this.socket.emit("join-room", roomId)
  }

  sendMessages(data): void {
    this.socket.emit("send-message", data)
    //return this.http.post<ChatResponse>(`http://localhost:3000/api/messages/send/${userToChatId}`, { message })
  }


  getMessages(userToChatId: string): Observable<ChatResponse> {
    return this.http.get<ChatResponse>(`https://zephyrchat.site/api/messages/${userToChatId}`)
  }


  recieveMessage(): Observable<ChatSocket> {
    return new Observable<ChatSocket>(observer => {
      this.socket.on("new-message", (data) => {
        observer.next(data)
      })
      return () => {
        this.socket.disconnect()
      }
    });
  }





}
