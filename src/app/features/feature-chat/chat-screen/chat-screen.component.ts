import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Socket, io } from 'socket.io-client';
import { ChatResponse } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  socket: Socket
  @Input() selectedUser: User
  messages: ChatResponse
  @ViewChild('messageForm') form: NgForm
  currentUserId: string
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
        this.socket.on('newMessage', (data) => {
          this.messages.message.push(data)
          console.log(this.messages)
        })
      }, (err) => {
        console.log(err)
      })
    }
  }





  sendMessage() {
    const message: string = this.form.value.message
    const messageData = { message }
    const currentUser = localStorage.getItem('currentUserId')
    this.chatService.sendMessages(currentUser, this.selectedUser._id, messageData)
    this.form.reset()
  }



}
