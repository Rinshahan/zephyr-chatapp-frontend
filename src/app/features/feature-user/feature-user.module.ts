import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FeautureUserRoutingModule } from './feature-user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserUpdateComponent
  ],
  imports: [
    CommonModule,
    FeautureUserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FeatureUserModule { }
