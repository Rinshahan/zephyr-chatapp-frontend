import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatResponse } from '../models/apis.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) {
  }

  sendMessages(userToChatId: string, { message }) {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.http.post<ChatResponse>(`http://localhost:3000/api/messages/send/${userToChatId}`, { message })
  }

  getMessages(userToChatId: string): Observable<ChatResponse> {
    return this.http.get<ChatResponse>(`http://localhost:3000/api/messages/${userToChatId}`)
  }



}
