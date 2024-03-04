import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class VideocallService {

  constructor(private chatService: ChatService) { }
}
