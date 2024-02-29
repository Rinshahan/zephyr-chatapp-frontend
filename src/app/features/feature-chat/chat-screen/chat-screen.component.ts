import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { ChatResponse, ChatSocket } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  selectedUserId: string

  constructor(private chatService: ChatService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.selectedUserId = this.activatedRoute.snapshot.paramMap.get("id")
    console.log(this.selectedUserId)
  }





  // send message method contains socket.io event 
  // sendMessage() {
  //   const message: string = this.form.value.message
  //   const currentUser = localStorage.getItem('currentUserId')
  //   const normalizedRoomId = `hai`
  //   this.chatService.sendMessages(currentUser, this.selectedUser._id, message, normalizedRoomId)
  //   this.form.reset()
  // }

  // unsunbscribe to avoid too many subscription and memory leakage
  // ngOnDestroy(): void {
  //   if (this.messageSubscription) {
  //     this.messageSubscription.unsubscribe()
  //   }
  //   this.chatService.unSubscribeFromMessages()
  // }
}
