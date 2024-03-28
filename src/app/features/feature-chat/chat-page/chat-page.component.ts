import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  users: User[]
  selectedUserId: string
  constructor(private sharedService: SharedService) {

  }

  ngOnInit(): void {
    this.sharedService.selectedUserId$.subscribe(userId => {
      this.selectedUserId = userId
    })
  }

}
