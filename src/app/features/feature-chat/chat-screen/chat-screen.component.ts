import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatResponse, decodedToken } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit, OnChanges {
  @Input() selectedUser: User
  messages: ChatResponse
  @ViewChild('messageForm') form: NgForm
  currentUserId: string
  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    if (this.selectedUser) {
      this.chatService.getMessages(this.selectedUser._id).subscribe((res) => {
        console.log(res)
        this.messages = res
        this.subscribeToMessages()
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
        console.log(this.messages.message);
      }, (err) => {
        console.log(err)
      })
    }
  }

  private subscribeToMessages(): void {
    this.chatService.subscribeToMessages().subscribe((message) => {
      console.log(message)
      //add recieved message to messages array
      this.messages.message.push(message)
    }, (err) => {
      console.log(err)
    })
  }



  sendMessage() {
    const message: string = this.form.value.message
    const messageData = { message }
    this.chatService.sendMessages(this.currentUserId, this.selectedUser._id, messageData)
    this.form.reset()
  }


  // ngOnDestroy(): void {
  //   this.chatService.getMessages(this.selectedUser._id).subscribe
  // }
}
