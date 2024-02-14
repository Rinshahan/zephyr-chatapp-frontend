import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChatResponse } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit, OnChanges {
  @Input() selectedUser: User
  messages: ChatResponse
  send: string
  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
    if (this.selectedUser) {
      this.chatService.getMessages(this.selectedUser._id).subscribe((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.chatService.getMessages(changes['selectedUser'].currentValue._id).subscribe((res) => {
        this.messages = res
        console.log(this.messages.message);
      }, (err) => {
        console.log(err)
      })
    }
  }

  sendMessage() {
    this.chatService.sendMessages(this.selectedUser._id, this.send).subscribe((res) => {
      console.log(res);
    }, (err) => {
      console.log(err)
    })
  }

}
