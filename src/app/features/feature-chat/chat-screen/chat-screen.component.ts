import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter, from } from 'rxjs';
import { ChatResponse, ChatSocket } from 'src/app/core/models/apis.model';
import { User } from 'src/app/core/models/user.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { SharedService } from 'src/app/core/services/shared.service';
@Component({
  selector: 'app-chat-screen',
  templateUrl: './chat-screen.component.html',
  styleUrls: ['./chat-screen.component.css']
})
export class ChatScreenComponent implements OnInit {
  @Input('messageForm') form: NgForm
  public selectedUserId: string
  public currentUserId: string
  public roomId: string = 'room 1'
  public messageArray: ChatSocket[]
  constructor(private chatService: ChatService, private sharedService: SharedService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.selectedUserId = this.activatedRoute.snapshot.paramMap.get("id")
    this.currentUserId = localStorage.getItem('currentUserId')
    this.messageArray = []
    this.sharedService.selectedUserId$.subscribe(userId => {
      this.selectedUserId = userId
      this.chatService.getMessages(userId).subscribe((res) => {
        console.log(res)
        this.messageArray = res.message
      }, (err) => {
        console.log(err)
      })
      this.chatService.joinRoom(this.roomId)
    })

    this.chatService.recieveMessage().subscribe((res) => {
      console.log(res)
      this.messageArray.push(res)
    })
  }

  sendMessage(form: NgForm) {
    const data = {
      message: form.value.message,
      sender: this.currentUserId,
      reciever: this.selectedUserId,
      room: this.roomId
    }
    this.chatService.sendMessages(data)
    form.reset()
  }


}
