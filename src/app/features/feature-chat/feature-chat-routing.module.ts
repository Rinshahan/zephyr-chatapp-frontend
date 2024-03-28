import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserSideBarComponent } from "./user-side-bar/user-side-bar.component";
import { ChatPageComponent } from "./chat-page/chat-page.component";
import { ChatScreenComponent } from "./chat-screen/chat-screen.component";
import { VideocallComponent } from "../feature-video/videocall/videocall.component";

const routes: Routes = [
  {
    path: '', component: ChatPageComponent, children: [
      {
        path: 'chat/user/:id', component: ChatScreenComponent, outlet: 'primary', data: { preload: true }
      }
    ]
  },


]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureChatRoutingModule { }