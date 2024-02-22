import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatResponse } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit, OnChanges, OnDestroy {
  socket: Socket
  @Input() selectedUser: User
  messages: ChatResponse
  @ViewChild('messageForm') form: NgForm
  currentUserId: string
  messageSubscription: Subscription
  constructor(private chatService: ChatService) {
    this.socket = io("http://localhost:3000")
  }

  ngOnInit(): void {
    if (this.selectedUser) {
      this.chatService.getMessages(this.selectedUser._id).subscribe((res) => {
        console.log(res)
        this.messages = res
      }, (err) => {
        console.log(err)
      })
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.chatService.getMessages(changes['selectedUser'].currentValue._id).subscribe((res) => {
        const currentUser = localStorage.getItem('currentUserId')
        this.currentUserId = currentUser
        this.messages = res
      }, (err) => {
        console.log(err)
      });
      this.chatService.subscribeToMessage().subscribe((message) => {
        console.log(message)
        if (message.reciever === this.selectedUser._id) {
          this.messages.message.push(message)
        }
      })
    }
  }





  sendMessage() {
    const message: string = this.form.value.message
    const currentUser = localStorage.getItem('currentUserId')
    this.chatService.sendMessages(currentUser, this.selectedUser._id, message)
    this.form.reset()
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }
    this.chatService.unSubscribeFromMessages()
  }


}
