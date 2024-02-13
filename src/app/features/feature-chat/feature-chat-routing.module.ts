import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserSideBarComponent } from "./user-side-bar/user-side-bar.component";

const routes: Routes = [
  { path: 'users', component: UserSideBarComponent },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureChatRoutingModule { }