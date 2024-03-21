import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserUpdateComponent } from "./user-update/user-update.component";
import { PasswordUpdateComponent } from "./password-update/password-update.component";
import { authGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
  { path: '', component: UserUpdateComponent },
  { path: 'updatepassword', component: PasswordUpdateComponent, canActivate: [authGuard] }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FeautureUserRoutingModule { }