import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
UserSideBarComponent
import { FeatureChatRoutingModule } from './feature-chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { FormsModule } from '@angular/forms';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { MatBadgeModule } from '@angular/material/badge'
import { MatIconModule } from "@angular/material/icon"
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { VideocallComponent } from '../feature-video/videocall/videocall.component';

@NgModule({
  declarations: [
    UserSideBarComponent,
    ChatPageComponent,
    ChatScreenComponent
  ],
  imports: [
    CommonModule,
    FeatureChatRoutingModule,
    FormsModule,
    MatBadgeModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule
  ]
})
export class FeatureChatModule { }
