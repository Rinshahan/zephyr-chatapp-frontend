import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { FeatureChatRoutingModule } from './feature-chat-routing.module';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatScreenComponent } from './chat-screen/chat-screen.component';



@NgModule({
  declarations: [
    UserSideBarComponent,
    ChatPageComponent,
    ChatScreenComponent
  ],
  imports: [
    CommonModule,
    FeatureChatRoutingModule
  ]
})
export class FeatureChatModule { }
