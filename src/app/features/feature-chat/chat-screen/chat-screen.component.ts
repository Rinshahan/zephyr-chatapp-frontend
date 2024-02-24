import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { ChatResponse, ChatSocket } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnChanges, OnDestroy {
  @Input() selectedUser: User
  messages: ChatResponse
  @ViewChild('messageForm') form: NgForm
  currentUserId: string
  messageSubscription: Subscription

  constructor(private chatService: ChatService) {

  }



  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      // unsubscribe if any previous subscription
      if (this.messageSubscription) {
        this.messageSubscription.unsubscribe()
      }
      // Get any previous message from the DB if
      this.chatService.getMessages(changes['selectedUser'].currentValue._id)
        .subscribe((res: ChatResponse) => {
          // getting the current logged userID
          const currentUser = localStorage.getItem('currentUserId')
          this.currentUserId = currentUser
          if (!res.message || !res.message) {
            this.messages = { message: [] }
          } else {
            this.messages = res
          }
        }, (err) => {
          console.log(err)
          // this.messages = { message: [] }
        })

      // subscribing the observable that returns the message that sended (contains event of socket.io)
      this.messageSubscription = this.chatService.subscribeToMessage().subscribe((message: ChatSocket) => {
        console.log(message)
        if (message.reciever === this.selectedUser._id || message.sender === this.selectedUser._id) {
          this.messages.message.push(message)
        }
      })

    }
  }



  // send message method contains socket.io event 
  sendMessage() {
    const message: string = this.form.value.message
    const currentUser = localStorage.getItem('currentUserId')
    this.chatService.sendMessages(currentUser, this.selectedUser._id, message)
    this.form.reset()
  }

  // unsunbscribe to avoid too many subscription and memory leakage
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe()
    }
    this.chatService.unSubscribeFromMessages()
  }
}
