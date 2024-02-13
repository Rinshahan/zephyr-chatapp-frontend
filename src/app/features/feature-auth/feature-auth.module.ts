import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureAuthRoutingModule } from './feature-auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignUpComponent } from './user-sign-up/user-sign-up.component';


@NgModule({
  declarations: [
    UserLoginComponent,
    UserSignUpComponent
  ],
  imports: [
    CommonModule,
    FeatureAuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class FeatureAuthModule { }
