import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { FeatureChatRoutingModule } from './feature-chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserSideBarComponent,
    ChatPageComponent,
    ChatScreenComponent
  ],
  imports: [
    CommonModule,
    FeatureChatRoutingModule,
    FormsModule
  ]
})
export class FeatureChatModule { }
