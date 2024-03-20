import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FeautureUserRoutingModule } from './feature-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordUpdateComponent } from './password-update/password-update.component';



@NgModule({
  declarations: [
    UserUpdateComponent,
    PasswordUpdateComponent
  ],
  imports: [
    CommonModule,
    FeautureUserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeatureUserModule { }
