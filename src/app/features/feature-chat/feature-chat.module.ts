import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSideBarComponent } from './user-side-bar/user-side-bar.component';
import { FeatureChatRoutingModule } from './feature-chat-routing.module';



@NgModule({
  declarations: [
    UserSideBarComponent
  ],
  imports: [
    CommonModule,
    FeatureChatRoutingModule
  ]
})
export class FeatureChatModule { }
