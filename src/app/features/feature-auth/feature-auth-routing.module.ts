import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserSignUpComponent } from "./user-sign-up/user-sign-up.component";
import { UserLoginComponent } from "./user-login/user-login.component";

const routes: Routes = [
  { path: '', component: UserSignUpComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeatureAuthRoutingModule { }