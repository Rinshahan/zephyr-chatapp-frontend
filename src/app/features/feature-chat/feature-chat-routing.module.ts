import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserSideBarComponent } from "./user-side-bar/user-side-bar.component";
import { ChatPageComponent } from "./chat-page/chat-page.component";

const routes: Routes = [
  { path: '', component: ChatPageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureChatRoutingModule { }