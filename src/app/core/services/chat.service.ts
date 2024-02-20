import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatResponse } from '../models/apis.model';
import io, { Socket } from "socket.io-client"

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket
  constructor(private http: HttpClient) {
    this.socket = io("http://localhost:3000")
  }

  sendMessages(userToChatId: string, { message }) {
    this.socket.emit("sendMessage", { userToChatId, message })
    return this.http.post<ChatResponse>(`http://localhost:3000/api/messages/send/${userToChatId}`, { message })
  }

  getMessages(userToChatId: string): Observable<ChatResponse> {
    return this.http.get<ChatResponse>(`http://localhost:3000/api/messages/${userToChatId}`)
  }



}
